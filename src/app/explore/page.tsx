import React from "react";
import Navbar from "@/components/landing/Navbar";
import Filters from "@/components/landing/Filters";
import AdventureGrid from "@/components/landing/AdventureGrid";
import Footer from "@/components/landing/Footer";

export default function ExplorePage() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-16 min-h-[calc(100vh-200px)]">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h1 className="text-5xl font-black font-headline text-on-background tracking-tighter">
            Explore <span className="text-primary">Adventures</span>
          </h1>
          <p className="text-on-surface-variant mt-4 font-medium max-w-2xl">
            Find the perfect safari, trekking, or photography expedition. Filter by destination, date, and budget.
          </p>
        </div>
        
        {/* We place Filters here not wrapped in a relative/absolute container so it flows normally */}
        <div className="mb-8">
          <Filters />
        </div>
        
        <AdventureGrid />
      </main>

      <Footer />
    </div>
  );
}
