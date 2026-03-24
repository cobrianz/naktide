import React from 'react';
import Link from 'next/link';

const MEMORIES = [
  {
    image: "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg",
    location: "Serengeti, Tanzania",
    date: "October 2024",
    title: "The Great Crossing",
    category: "Safari",
    span: "md:col-span-8 md:row-span-2",
  },
  {
    image: "https://images.pexels.com/photos/4034871/pexels-photo-4034871.jpeg",
    location: "Volcanoes NP, Rwanda",
    date: "November 2024",
    title: "Mist & Silverbacks",
    category: "Trekking",
    span: "md:col-span-4 md:row-span-1",
  },
  {
    image: "https://images.pexels.com/photos/1670984/pexels-photo-1670984.jpeg",
    location: "Okavango Delta, Botswana",
    date: "December 2024",
    title: "Mirrored Waters",
    category: "Expedition",
    span: "md:col-span-4 md:row-span-1",
  },
];

export default function MemoriesGrid() {
  return (
    <section className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block mb-6 px-4 py-1 border border-primary/20 rounded-full w-fit">
              Archived Memories
            </span>
            <h2 className="text-4xl md:text-6xl font-headline font-black text-on-surface tracking-tighter leading-[0.9] mb-8">
              We don&apos;t just run tours;<br />
              <span className="text-primary italic">we forge legendary experiences.</span>
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">
              From the dust of the Serengeti to the mist of the Virunga mountains, we capture moments that transcend the ordinary journey.
            </p>
          </div>
          <div className="hidden lg:block border-l border-outline-variant/30 pl-12">
            <div className="text-5xl font-headline font-black text-primary mb-2">12k+</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Moments Captured</div>
          </div>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[900px]">
          {MEMORIES.map((m, i) => (
            <div 
              key={i} 
              className={`${m.span} relative group rounded-2xl overflow-hidden bg-surface-container-low`}
            >
              <img 
                src={m.image} 
                alt={m.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Permanent Gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-primary px-3 py-1 rounded-sm">
                    {m.category}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                    {m.date}
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-headline font-black tracking-tighter group-hover:text-primary transition-colors duration-300">
                  {m.title}
                </h3>
                <p className="text-white/60 text-sm font-medium mt-2 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {m.location}
                </p>
                
                <div className="mt-8 pt-6 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <Link href="/gallery" className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all">
                    View Chapter <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Overlay */}
        <div className="mt-20 flex flex-col items-center">
          <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent mb-8"></div>
          <Link href="/gallery" className="group flex flex-col items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant group-hover:text-primary transition-colors">
              Explore the full archive
            </span>
            <span className="material-symbols-outlined text-4xl text-primary-fixed group-hover:translate-y-2 transition-transform cursor-pointer animate-bounce">
              expand_more
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
