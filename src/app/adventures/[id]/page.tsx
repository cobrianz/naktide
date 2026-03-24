import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import GalleryOverlay from "@/components/landing/GalleryOverlay";
import BookingSidebar from "@/components/landing/BookingSidebar";
import { getCatalogue, getMediaAssets } from "@/lib/mock-data";
import { getTourGalleryImages } from "@/lib/public-content";

export default async function AdventureDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [tours, media] = await Promise.all([getCatalogue(), getMediaAssets()]);
  const adventure = tours.find((tour) => tour.id === id);

  if (!adventure) notFound();

  const allImages = getTourGalleryImages(adventure, media);
  const mainImage = allImages[0] || adventure.image;
  const secondaryImage1 = allImages[1] || adventure.image;
  const secondaryImage2 = allImages[2] || adventure.image;

  return (
    <div className="min-h-screen bg-background font-body text-on-background">
      <Navbar />
      <main className="pb-24 pt-24">
        <div className="mx-auto mb-6 max-w-7xl px-6">
          <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            <Link className="transition-colors hover:text-primary" href="/">Home</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <Link className="transition-colors hover:text-primary" href="/explore">Adventures</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="inline-block max-w-[200px] truncate align-bottom font-black text-on-surface">{adventure.title}</span>
          </nav>
        </div>

        <section className="relative mx-auto h-[50vh] w-full max-w-7xl overflow-hidden px-6 text-white md:h-[700px]">
          <div className="flex h-full flex-col gap-4 md:flex-row">
            <div className="group relative h-1/2 overflow-hidden rounded-xl md:h-full md:w-2/3">
              <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={mainImage} alt={adventure.altText} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-6 pr-6 text-white md:left-10">
                <span className="rounded-full bg-secondary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest text-on-secondary-container">{adventure.location}</span>
                <h1 className="mt-4 font-headline text-4xl font-black leading-none tracking-tighter md:text-6xl">{adventure.title}</h1>
              </div>
            </div>

            <div className="flex h-1/2 gap-4 md:h-full md:w-1/3 md:flex-col">
              <div className="group relative h-full w-1/2 overflow-hidden rounded-xl md:h-1/2 md:w-full"><img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={secondaryImage1} alt="Secondary view 1" /></div>
              <div className="group relative h-full w-1/2 overflow-hidden rounded-xl md:h-1/2 md:w-full">
                <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={secondaryImage2} alt="Secondary view 2" />
                <GalleryOverlay images={allImages} />
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-12 flex flex-wrap gap-8 border-y border-outline-variant/30 py-6">
              <div className="flex flex-col"><span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Duration</span><span className="flex items-center gap-1 font-bold"><span className="material-symbols-outlined text-sm text-primary">schedule</span>{adventure.duration}</span></div>
              <div className="flex flex-col"><span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Group Size</span><span className="flex items-center gap-1 font-bold"><span className="material-symbols-outlined text-sm text-primary">groups</span>{adventure.groupSize}</span></div>
              <div className="flex flex-col"><span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Difficulty</span><span className="flex items-center gap-1 font-bold"><span className="material-symbols-outlined text-sm text-primary">hiking</span>{adventure.difficulty}</span></div>
            </div>

            <div className="mb-16">
              <h2 className="mb-6 font-headline text-2xl font-black">Expedition Overview</h2>
              <p className="text-lg leading-relaxed text-on-surface-variant">{adventure.overview}</p>
            </div>

            {adventure.itinerary?.length ? (
              <div className="mb-16">
                <h2 className="mb-8 font-headline text-2xl font-black">Detailed Itinerary</h2>
                <div className="space-y-0">
                  {adventure.itinerary.map((day) => (
                    <div key={`${adventure.id}-${day.day}`} className="group relative border-l-2 border-outline-variant/30 pb-8 pl-8 last:border-0 last:pb-0">
                      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-primary bg-surface transition-all group-hover:scale-125 group-hover:bg-primary" />
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">Day {day.day}</div>
                      <h3 className="mb-3 font-headline text-xl font-bold text-on-background">{day.title}</h3>
                      <p className="text-sm leading-relaxed text-on-surface-variant">{day.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mb-16 grid gap-8 md:grid-cols-2">
              <div className="rounded-xl bg-surface-container-low p-6">
                <h3 className="mb-4 flex items-center gap-2 font-bold"><span className="material-symbols-outlined text-secondary">check_circle</span> Included</h3>
                <ul className="space-y-3">
                  {adventure.included?.map((item) => <li key={item} className="flex items-start gap-2 text-sm text-on-surface-variant"><span className="material-symbols-outlined text-[16px] text-[#2a6b2c]">check</span>{item}</li>)}
                </ul>
              </div>
              <div className="rounded-xl bg-error-container/20 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-bold"><span className="material-symbols-outlined text-error">cancel</span> Excluded</h3>
                <ul className="space-y-3">
                  {adventure.excluded?.map((item) => <li key={item} className="flex items-start gap-2 text-sm text-on-surface-variant"><span className="material-symbols-outlined text-[16px] text-error">close</span>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>

          <BookingSidebar adventure={adventure} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
