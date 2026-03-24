import Link from "next/link";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { getCatalogue } from "@/lib/mock-data";

export default async function PastAdventuresPage() {
  const adventures = (await getCatalogue()).filter((adventure) => adventure.status === "completed");

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Navbar />
      <main className="px-0 pb-0 pt-32">
        <div className="mx-auto max-w-[1500px] px-6 md:px-12">
          <nav className="mb-12 flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            <Link className="transition-colors hover:text-primary" href="/">Home</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="font-black text-on-surface">Past Adventures</span>
          </nav>

          <header className="mb-20 grid items-end gap-8 md:grid-cols-2">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-primary">The Editorial Explorer Series</span>
              <h1 className="font-headline text-6xl font-extrabold leading-none tracking-tighter text-on-surface md:text-8xl">Past <br /> <span className="text-primary-container">Adventures.</span></h1>
            </div>
            <div className="pb-2 md:max-w-lg"><p className="text-lg italic leading-relaxed text-on-surface-variant">&quot;A collection of footprints left across the savannah, echoes of journeys that shaped our perspective of the wild.&quot;</p></div>
          </header>

          <div className="mb-16 flex flex-col items-start justify-between gap-6 border-b border-outline-variant/30 pb-8 md:flex-row md:items-center">
            <div className="flex gap-4">
              <button className="rounded-full bg-surface-container-highest px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:bg-surface-dim">Filter by year</button>
              <button className="rounded-full bg-surface-container-highest px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:bg-surface-dim">Region</button>
            </div>
            <div className="text-sm font-medium text-on-surface-variant">Showing <span className="font-bold text-on-surface">{adventures.length} archived expeditions</span></div>
          </div>

          <section className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-12">
            {adventures[0] ? <Link href={`/adventures/${adventures[0].id}`} className="group relative block h-full overflow-hidden rounded-[1.75rem] border border-outline-variant/30 bg-surface-container-lowest transition-colors hover:border-primary md:col-span-8"><div className="aspect-[16/10] overflow-hidden"><img alt={adventures[0].altText} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={adventures[0].image} /></div><div className="absolute right-4 top-4 rounded-full bg-secondary-container px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-on-secondary-container">Completed</div><div className="grid items-start gap-6 p-8 md:grid-cols-3"><div className="md:col-span-2"><div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">{adventures[0].location} | {adventures[0].date}</div><h3 className="mb-4 font-headline text-4xl font-bold text-on-surface">{adventures[0].title}</h3><p className="max-w-2xl text-base text-on-surface-variant">{adventures[0].overview}</p></div><div className="flex h-full flex-col justify-between space-y-4 md:items-end"><div className="text-right"><span className="block text-[10px] uppercase tracking-widest text-on-surface-variant">Final price</span><span className="text-2xl font-black text-on-surface">{adventures[0].price}</span></div><span className="w-full border-b-2 border-primary py-1 text-sm font-bold text-on-surface transition-all group-hover:pr-4 md:w-auto">View details -&gt;</span></div></div></Link> : null}
            {adventures[1] ? <Link href={`/adventures/${adventures[1].id}`} className="group relative block h-full self-start overflow-hidden rounded-[1.75rem] border border-outline-variant/30 bg-surface-container-lowest transition-colors hover:border-primary md:col-span-4"><div className="aspect-square overflow-hidden"><img alt={adventures[1].altText} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={adventures[1].image} /></div><div className="absolute right-4 top-4 rounded-full bg-secondary-container px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-on-secondary-container">Completed</div><div className="p-6"><div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">{adventures[1].location} | {adventures[1].date}</div><h3 className="mb-3 font-headline text-2xl font-bold text-on-surface">{adventures[1].title}</h3><div className="flex items-end justify-between"><span className="text-xl font-black text-on-surface">{adventures[1].price}</span><span className="text-xs font-bold uppercase tracking-widest text-primary group-hover:underline">View details</span></div></div></Link> : null}
            {adventures[2] ? <Link href={`/adventures/${adventures[2].id}`} className="group relative block h-full overflow-hidden rounded-[1.75rem] border border-outline-variant/30 bg-surface-container-lowest transition-colors hover:border-primary md:col-span-4"><div className="aspect-[4/5] min-h-[460px] overflow-hidden"><img alt={adventures[2].altText} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={adventures[2].image} /></div><div className="absolute right-4 top-4 rounded-full bg-secondary-container px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-on-secondary-container">Completed</div><div className="p-6"><div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">{adventures[2].location} | {adventures[2].date}</div><h3 className="mb-3 font-headline text-2xl font-bold text-on-surface">{adventures[2].title}</h3><div className="flex items-end justify-between"><span className="text-xl font-black text-on-surface">{adventures[2].price}</span><span className="text-xs font-bold uppercase tracking-widest text-primary group-hover:underline">View details</span></div></div></Link> : null}
            {adventures[3] ? <Link href={`/adventures/${adventures[3].id}`} className="group relative block h-full overflow-hidden rounded-[1.75rem] border border-outline-variant/30 bg-surface-container-lowest transition-colors hover:border-primary md:col-span-8"><div className="flex h-full flex-col md:flex-row"><div className="aspect-square overflow-hidden md:w-1/2 md:aspect-auto"><img alt={adventures[3].altText} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={adventures[3].image} /></div><div className="flex flex-col justify-center p-8 md:w-1/2"><div className="mb-4 w-fit rounded-full bg-secondary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest text-on-secondary-container">Completed</div><div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">{adventures[3].location} | {adventures[3].date}</div><h3 className="mb-4 font-headline text-3xl font-bold text-on-surface">{adventures[3].title}</h3><p className="mb-6 line-clamp-3 text-base text-on-surface-variant">{adventures[3].overview}</p><div className="mt-auto flex items-center justify-between"><span className="text-2xl font-black text-on-surface">{adventures[3].price}</span><div className="rounded-full bg-surface-container-high p-2 transition-colors group-hover:bg-primary group-hover:text-white"><span className="material-symbols-outlined">arrow_forward</span></div></div></div></div></Link> : null}
          </section>
        </div>

        <section className="mt-12 rounded-t-[3rem] bg-surface-container-highest px-6 py-24">
          <div className="mx-auto max-w-[1500px] border-b border-t border-outline-variant/30 py-16 text-center">
            <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-secondary">Our legacy</span>
            <h2 className="mb-16 font-headline text-4xl font-black text-on-surface">By The Numbers</h2>
            <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
              <div><div className="mb-4 text-5xl font-black text-primary drop-shadow-sm md:text-7xl">{adventures.length}</div><div className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Expeditions</div></div>
              <div><div className="mb-4 text-5xl font-black text-primary drop-shadow-sm md:text-7xl">{new Set(adventures.map((adventure) => adventure.location)).size}</div><div className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Regions</div></div>
              <div><div className="mb-4 text-5xl font-black text-primary drop-shadow-sm md:text-7xl">{adventures.reduce((sum, adventure) => sum + adventure.itinerary.length, 0)}</div><div className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Itinerary days</div></div>
              <div><div className="mb-4 text-5xl font-black text-primary drop-shadow-sm md:text-7xl">100%</div><div className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Archive controlled</div></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
