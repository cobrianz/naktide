import React from 'react';

export default function UpcomingEventsSection() {
  return (
    <section className="py-24 bg-surface max-w-7xl mx-auto px-6">
      <div className="text-center mb-12 flex flex-col items-center">
        <span className="material-symbols-outlined text-primary mb-2 text-3xl">public</span>
        <span className="text-on-surface-variant font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block text-center">
          NakTide Expeditions
        </span>
        <h2 className="text-3xl font-headline font-black text-on-background">Upcoming Departures.</h2>
      </div>

      <div className="flex flex-col md:flex-row rounded-[2rem] overflow-hidden border border-outline-variant/30 bg-surface-container-lowest h-auto md:h-[600px]">
        {/* Left Info Panel */}
        <div className="md:w-[45%] p-12 lg:p-20 flex flex-col justify-center items-center text-center">
          <h3 className="text-lg lg:text-xl font-bold uppercase tracking-widest mb-6 leading-relaxed">
            OUR UPCOMING EVENTS <span className="text-primary-fixed block lg:inline mt-2 lg:mt-0">SERENGETI CROSSING</span>
          </h3>
          <p className="text-on-surface-variant text-sm max-w-sm mb-12 leading-relaxed">
            Witness one of nature's greatest spectacles. The Great Migration sees millions of wildebeest and zebra brave the treacherous Mara River.
          </p>
          <p className="font-bold text-xs uppercase tracking-widest mb-12 text-on-background">
            October 12, 2024. Join us!!
          </p>
          <div className="flex gap-4">
            <button className="border border-outline-variant/30 px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-surface-container transition-colors">Read More</button>
            <button className="border border-outline-variant/30 px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-surface-container transition-colors">Book Session</button>
          </div>
        </div>
        
        {/* Right Large Image */}
        <div className="md:w-[55%] h-[400px] md:h-full">
          <img 
            src="https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=1200" 
            alt="Safari Event" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </section>
  )
}
