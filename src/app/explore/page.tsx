import React from "react";
import Navbar from "@/components/landing/Navbar";
import Filters from "@/components/landing/Filters";
import AdventureGrid from "@/components/landing/AdventureGrid";
import Footer from "@/components/landing/Footer";

import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialSection from "@/components/landing/TestimonialSection";

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
        
        <FeaturesSection />
        <TestimonialSection />
      </main>

      <Footer />
    </div>
  );
}
