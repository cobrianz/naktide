import React from 'react';

export default function ServicesSection() {
  return (
    <section className="py-24 bg-surface max-w-7xl mx-auto px-6">
      <div className="text-center mb-20 flex flex-col items-center">
        <span className="material-symbols-outlined text-primary mb-2 text-3xl">landscape</span>
        <span className="text-on-surface-variant font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block text-center">
          NakTide Safaris & Expeditions
        </span>
        <h2 className="text-3xl font-headline font-black text-primary-fixed">What we offer</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        {/* Left List */}
        <div className="space-y-16">
          <div className="text-center md:text-left">
            <h3 className="text-primary-fixed font-bold mb-3 text-lg">Private Game Drives</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Exclusive off-road access in custom 4x4 vehicles. Track apex predators at your own pace with expert guides.</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-primary-fixed font-bold mb-3 text-lg">Walking Safaris</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Experience the bush at ground level. Learn tracking techniques and discover the micro-ecosystems often missed from vehicles.</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-primary-fixed font-bold mb-3 text-lg">Conservation Tours</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Behind-the-scenes access to wildlife sanctuaries. Participate directly in rhino tracking and population counting.</p>
          </div>
        </div>

        {/* Center Image */}
        <div className="flex justify-center h-full relative py-12 md:py-0">
           <img 
             src="https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg" 
             alt="Vintage Camera" 
             className="w-48 object-contain opacity-90 mix-blend-multiply" 
           />
        </div>

        {/* Right List */}
        <div className="space-y-16">
          <div className="text-center md:text-left">
            <h3 className="text-primary-fixed font-bold mb-3 text-lg">Aerial Photography</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Helicopter and bush-plane excursions offering unprecedented views of migratory herds and endless landscapes.</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-primary-fixed font-bold mb-3 text-lg">Mobile Camping</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Follow the migration in style. Fully staffed, zero-footprint canvas camps set up in exclusive wilderness zones.</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-primary-fixed font-bold mb-3 text-lg">Photography Workshops</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">Led by award-winning wildlife photographers. Perfect your techniques in golden-hour light and dynamic scenarios.</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-20">
        <a href="/explore" className="text-xs font-bold uppercase tracking-widest border-b border-primary-fixed text-primary-fixed pb-1 hover:opacity-70 transition-opacity">See itineraries</a>
      </div>
    </section>
  )
}
