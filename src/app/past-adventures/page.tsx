import React from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { getPastAdventures } from "@/api/adventures";
import FeaturesSection from "@/components/landing/FeaturesSection";
import EditorialSection from "@/components/landing/EditorialSection";

export default async function PastAdventuresPage() {
  const adventures = await getPastAdventures();

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-0 px-0 md:px-0">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs uppercase tracking-widest text-on-surface-variant mb-12 font-bold">
            <Link className="hover:text-primary transition-colors" href="/">Home</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-on-surface font-black">Past Adventures</span>
          </nav>

          {/* Header Section (Editorial Layout) */}
          <header className="mb-20 grid md:grid-cols-2 gap-8 items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary block mb-4">
                The Editorial Explorer Series
              </span>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface leading-none">
                Past <br /> <span className="text-primary-container">Adventures.</span>
              </h1>
            </div>
            <div className="md:max-w-md pb-2">
              <p className="text-on-surface-variant text-lg leading-relaxed italic">
                "A collection of footprints left across the savannah, echoes of journeys that shaped our perspective of the wild."
              </p>
            </div>
          </header>

          {/* Filter/Search Bar (Minimalist) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 border-b border-outline-variant/30 pb-8">
            <div className="flex gap-4">
              <button className="bg-surface-container-highest px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:bg-surface-dim transition-colors">
                Filter By Year
              </button>
              <button className="bg-surface-container-highest px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:bg-surface-dim transition-colors">
                Region
              </button>
            </div>
            <div className="text-on-surface-variant text-sm font-medium">
              Showing <span className="text-on-surface font-bold">{adventures.length} archived expeditions</span>
            </div>
          </div>

          {/* Adventures Grid (Bento Style & Asymmetric) */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
            
            {/* Card 1 (Large Feature) */}
            {adventures[0] && (
              <Link href={`/adventures/${adventures[0].id}`} className="block h-full md:col-span-8 group relative bg-surface-container-lowest overflow-hidden rounded-xl border border-outline-variant/30 hover:border-primary transition-colors">
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    alt={adventures[0].altText} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={adventures[0].image}
                  />
                </div>
                <div className="absolute top-4 right-4 bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Completed
                </div>
                <div className="p-8 grid md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-2">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2">
                      {adventures[0].location} · {adventures[0].date}
                    </div>
                    <h3 className="font-headline text-3xl font-bold text-on-surface mb-4">
                      {adventures[0].title}
                    </h3>
                    <p className="text-on-surface-variant text-sm max-w-md">
                      {adventures[0].overview}
                    </p>
                  </div>
                  <div className="flex flex-col items-start md:items-end justify-between h-full space-y-4">
                    <div className="text-right">
                      <span className="block text-[10px] uppercase text-on-surface-variant tracking-widest">Final Price</span>
                      <span className="text-2xl font-black text-on-surface">{adventures[0].price}</span>
                    </div>
                    <span className="w-full md:w-auto border-b-2 border-primary text-on-surface font-bold text-sm py-1 transition-all group-hover:pr-4">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Card 2 (Standard) */}
            {adventures[1] && (
              <Link href={`/adventures/${adventures[1].id}`} className="block h-full md:col-span-4 group relative bg-surface-container-lowest overflow-hidden rounded-xl self-start border border-outline-variant/30 hover:border-primary transition-colors">
                <div className="aspect-square overflow-hidden">
                  <img 
                    alt={adventures[1].altText} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={adventures[1].image}
                  />
                </div>
                <div className="absolute top-4 right-4 bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Completed
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2">
                    {adventures[1].location} · {adventures[1].date}
                  </div>
                  <h3 className="font-headline text-xl font-bold text-on-surface mb-3">{adventures[1].title}</h3>
                  <div className="flex justify-between items-end">
                    <span className="text-xl font-black text-on-surface">{adventures[1].price}</span>
                    <span className="text-primary font-bold text-xs uppercase tracking-widest group-hover:underline">View Details</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Card 3 (Standard) */}
            {adventures[2] && (
              <Link href={`/adventures/${adventures[2].id}`} className="block h-full md:col-span-4 group relative bg-surface-container-lowest overflow-hidden rounded-xl border border-outline-variant/30 hover:border-primary transition-colors">
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    alt={adventures[2].altText} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={adventures[2].image}
                  />
                </div>
                <div className="absolute top-4 right-4 bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Completed
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2">
                    {adventures[2].location} · {adventures[2].date}
                  </div>
                  <h3 className="font-headline text-xl font-bold text-on-surface mb-3">{adventures[2].title}</h3>
                  <div className="flex justify-between items-end">
                    <span className="text-xl font-black text-on-surface">{adventures[2].price}</span>
                    <span className="text-primary font-bold text-xs uppercase tracking-widest group-hover:underline">View Details</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Card 4 (Medium Horizontal) */}
            {adventures[3] && (
              <Link href={`/adventures/${adventures[3].id}`} className="block h-full md:col-span-8 group relative bg-surface-container-lowest overflow-hidden rounded-xl border border-outline-variant/30 hover:border-primary transition-colors">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2 aspect-square md:aspect-auto overflow-hidden">
                    <img 
                      alt={adventures[3].altText} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      src={adventures[3].image}
                    />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="bg-secondary-container text-on-secondary-container w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Completed</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2">
                      {adventures[3].location} · {adventures[3].date}
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">{adventures[3].title}</h3>
                    <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">
                      {adventures[3].overview}
                    </p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-2xl font-black text-on-surface">{adventures[3].price}</span>
                      <div className="bg-surface-container-high p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </section>
        </div>
        
        {/* Extra Sections below the grid */}
        <FeaturesSection />
        <EditorialSection />
      </main>
      
      <Footer />
    </div>
  );
}
