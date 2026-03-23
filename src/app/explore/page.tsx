import React from "react";
import Navbar from "@/components/landing/Navbar";
import Filters from "@/components/landing/Filters";
import AdventureGrid from "@/components/landing/AdventureGrid";
import Footer from "@/components/landing/Footer";

export default function ExplorePage() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen">
      <Navbar />
      
      {/* Explore Hero Banner */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <img
            src="https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Explore the wild"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/20"></div>
        </div>
        <div className="relative z-10 text-center px-6 mt-20">
          <span className="text-primary-fixed block uppercase tracking-[0.3em] font-bold text-xs mb-4 drop-shadow-sm">
            Discover Your Path
          </span>
          <h1 className="text-6xl md:text-7xl font-black font-headline text-white tracking-tighter drop-shadow-lg">
            Explore <br />Our World.
          </h1>
        </div>
      </section>

      <main className="pb-0">
        {/* Filters hoisted slightly over the background gradient */}
        <div className="-mt-12 mb-20 relative z-20">
          <Filters />
        </div>
        
        <AdventureGrid />
        
        <section className="py-24 bg-surface-container-low px-6 mt-20 rounded-t-[3rem]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">The NakTide Difference</span>
              <h2 className="text-4xl font-headline font-black mb-6">Expertise in the Wild</h2>
              <p className="text-on-surface-variant leading-relaxed mb-6">Every NakTide guide is accredited by the Field Guides Association. We prioritize sustainable travel, ensuring your footprints fade but your memories endure.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary">check_circle</span> <span className="font-bold text-sm">Custom 4x4 Off-Road Vehicles</span></li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary">check_circle</span> <span className="font-bold text-sm">Carbon Negative Operations</span></li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary">check_circle</span> <span className="font-bold text-sm">Deep Community Integration</span></li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video relative shadow-lg">
              <img src="https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg" className="w-full h-full object-cover" alt="Expertise" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
