import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import GalleryOverlay from "@/components/landing/GalleryOverlay";
import { getAdventureById } from "@/api/adventures";

export default async function AdventureDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const adventure = await getAdventureById(id);

  if (!adventure) {
    notFound();
  }

  // Ensure there are enough images to render the triple layout, 
  // fallback to main image if not enough secondary images are provided.
  const mainImage = adventure.images?.[0] || adventure.image;
  const secondaryImage1 = adventure.images?.[1] || adventure.image;
  const secondaryImage2 = adventure.images?.[2] || adventure.image;

  return (
    <div className="bg-background text-on-background font-body min-h-screen">
      <Navbar />

      <main className="pt-24 pb-24">
        {/* Navigation Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <nav className="flex items-center space-x-2 text-xs uppercase tracking-widest text-on-surface-variant font-bold">
            <Link className="hover:text-primary transition-colors" href="/">Home</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <Link className="hover:text-primary transition-colors" href="/explore">Adventures</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-on-surface font-black truncate max-w-[200px] inline-block align-bottom">{adventure.title}</span>
          </nav>
        </div>

        {/* Hero Image Section */}
        <section className="relative w-full h-[50vh] md:h-[700px] px-6 max-w-7xl mx-auto overflow-hidden text-white">
          <div className="flex flex-col md:flex-row h-full gap-4">
            <div className="md:w-2/3 h-1/2 md:h-full relative rounded-xl overflow-hidden group">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={mainImage} 
                alt={adventure.altText} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-10 left-6 md:left-10 text-white pr-6">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                  {adventure.location}
                </span>
                <h1 className="text-4xl md:text-6xl font-black font-headline mt-4 tracking-tighter leading-none">
                  {adventure.title}
                </h1>
              </div>
            </div>

            <div className="md:w-1/3 h-1/2 md:h-full flex md:flex-col gap-4">
              <div className="w-1/2 md:w-full h-full md:h-1/2 rounded-xl overflow-hidden relative group">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src={secondaryImage1} 
                  alt="Secondary view 1" 
                />
              </div>
              <div className="w-1/2 md:w-full h-full md:h-1/2 rounded-xl overflow-hidden relative group">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src={secondaryImage2} 
                  alt="Secondary view 2" 
                />
                <GalleryOverlay images={adventure.images || [mainImage]} />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content & Sidebar Grid */}
        <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column (Overview & Itinerary) */}
          <div className="lg:col-span-8">
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 mb-12 py-6 border-y border-outline-variant/30">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Duration</span>
                <span className="font-bold flex items-center gap-1"><span className="material-symbols-outlined text-primary text-sm">schedule</span>{adventure.duration}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Group Size</span>
                <span className="font-bold flex items-center gap-1"><span className="material-symbols-outlined text-primary text-sm">groups</span>{adventure.groupSize}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Difficulty</span>
                <span className="font-bold flex items-center gap-1"><span className="material-symbols-outlined text-primary text-sm">hiking</span>{adventure.difficulty}</span>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-16">
              <h2 className="text-2xl font-black font-headline mb-6">Expedition Overview</h2>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                {adventure.overview}
              </p>
            </div>

            {/* Itinerary */}
            {adventure.itinerary && adventure.itinerary.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-black font-headline mb-8">Detailed Itinerary</h2>
                <div className="space-y-0">
                  {adventure.itinerary.map((day, idx) => (
                    <div key={idx} className="group relative pl-8 border-l-2 border-outline-variant/30 pb-8 last:pb-0 last:border-0">
                      {/* Timeline dot */}
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface border-2 border-primary group-hover:bg-primary group-hover:scale-125 transition-all"></div>
                      
                      <div className="text-[10px] uppercase tracking-widest font-bold text-primary mb-1">Day {day.day}</div>
                      <h3 className="text-xl font-bold font-headline mb-3 text-on-background">{day.title}</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        {day.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Included / Excluded */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-surface-container-low p-6 rounded-xl">
                <h3 className="font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-secondary">check_circle</span> Included</h3>
                <ul className="space-y-3">
                  {adventure.included?.map((inc, i) => (
                    <li key={i} className="text-sm text-on-surface-variant flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#2a6b2c] text-[16px]">check</span>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-error-container/20 p-6 rounded-xl">
                <h3 className="font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-error">cancel</span> Excluded</h3>
                <ul className="space-y-3">
                  {adventure.excluded?.map((exc, i) => (
                    <li key={i} className="text-sm text-on-surface-variant flex items-start gap-2">
                      <span className="material-symbols-outlined text-error text-[16px]">close</span>
                      {exc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Right Column (Sticky Booking Sidebar) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30">
              <div className="mb-6">
                <span className="text-4xl font-black text-on-surface inline-block align-bottom">{adventure.price}</span>
                <span className="text-on-surface-variant text-sm font-bold uppercase tracking-widest ml-2 align-bottom">/ person</span>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-outline-variant/20">
                  <span className="text-sm text-on-surface-variant font-bold">Departure Date</span>
                  <span className="text-sm font-bold text-on-surface">{adventure.date}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-outline-variant/20">
                  <span className="text-sm text-on-surface-variant font-bold">Availability</span>
                  <span className="text-sm font-black text-primary">{adventure.slots}</span>
                </div>
              </div>

              {adventure.status === "upcoming" ? (
                 <button className="w-full bg-primary hover:bg-[#ad2c00] text-white py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-transform hover:scale-[1.02] active:scale-95 shadow-none mb-4">
                   Reserve Spot
                 </button>
              ) : (
                <button disabled className="w-full bg-surface-container-highest text-on-surface-variant py-4 rounded-full font-bold text-sm uppercase tracking-widest mb-4 cursor-not-allowed">
                  Expedition Completed
                </button>
              )}
              
              <p className="text-center text-xs text-on-surface-variant mt-4">
                No payment required to hold reservation.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
