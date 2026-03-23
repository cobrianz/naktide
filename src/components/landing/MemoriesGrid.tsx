import React from 'react';
import Link from 'next/link';

export default function MemoriesGrid() {
  return (
    <section className="py-24 bg-surface max-w-7xl mx-auto px-6">
      <div className="text-center mb-20 flex flex-col items-center">
        <span className="material-symbols-outlined text-primary mb-2 text-3xl">camera</span>
        <span className="text-on-surface-variant font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block text-center">
          NakTide Safaris
        </span>
        <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-background">
          We don't just run tours; <span className="text-primary-fixed font-black">we forge legendary experiences.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:h-[800px]">
        {/* Left Column - Large Image */}
        <div className="md:col-span-4 h-[500px] md:h-full relative group rounded-2xl overflow-hidden">
          <img src="https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg" alt="Memory" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 p-8 w-full text-white z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest block mb-2 opacity-80">Oct 2024 / Safari</span>
            <h3 className="text-3xl font-black font-headline mb-4">The Serengeti</h3>
            <Link href="/explore" className="text-xs uppercase border-b border-white/50 pb-1 hover:border-white transition-colors">View More →</Link>
          </div>
        </div>

        {/* Right Column - 2x2 Grid */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 h-full">
          
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-hidden rounded-xl bg-surface-container-low mb-4">
              <img src="https://images.pexels.com/photos/4034871/pexels-photo-4034871.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Memory" />
            </div>
            <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">November 2024 / Trekking</div>
            <div className="text-sm italic font-medium text-on-surface">Mountain gorillas in the mist</div>
          </div>
          
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-hidden rounded-xl bg-surface-container-low mb-4">
              <img src="https://images.pexels.com/photos/1670984/pexels-photo-1670984.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Memory" />
            </div>
            <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">December 2024 / Waterways</div>
            <div className="text-sm italic font-medium text-on-surface">Gliding through the Okavango</div>
          </div>
          
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-hidden rounded-xl bg-surface-container-low mb-4">
              <img src="https://images.pexels.com/photos/609749/pexels-photo-609749.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Memory" />
            </div>
            <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">January 2024 / Desert</div>
            <div className="text-sm italic font-medium text-on-surface">Tracing the Skeleton Coast</div>
          </div>
          
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-hidden rounded-xl bg-surface-container-low mb-4">
              <img src="https://images.pexels.com/photos/33231637/pexels-photo-33231637.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Memory" />
            </div>
            <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">March 2024 / Culture</div>
            <div className="text-sm italic font-medium text-on-surface">Connecting with ancient traditions</div>
          </div>

        </div>
      </div>
    </section>
  )
}
