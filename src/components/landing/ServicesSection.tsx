import React from 'react';
import Link from 'next/link';

const SERVICES = [
  {
    icon: "directions_car",
    title: "Private Game Drives",
    description: "Exclusive off-road access in custom 4x4 vehicles. Track apex predators at your own pace with expert guides.",
    stat: "100+",
    statLabel: "Routes mapped",
  },
  {
    icon: "hiking",
    title: "Walking Safaris",
    description: "Experience the bush at ground level. Learn tracking and discover micro-ecosystems missed from vehicles.",
    stat: "3–8",
    statLabel: "Guests per walk",
  },
  {
    icon: "forest",
    title: "Conservation Tours",
    description: "Behind-the-scenes access to wildlife sanctuaries. Participate directly in rhino tracking & population counting.",
    stat: "25+",
    statLabel: "Partner reserves",
  },
  {
    icon: "flight",
    title: "Aerial Photography",
    description: "Helicopter and bush-plane excursions offering unprecedented views of migratory herds and vast landscapes.",
    stat: "4K",
    statLabel: "Footage captured",
  },
  {
    icon: "tent",
    title: "Mobile Camping",
    description: "Follow the migration in style. Fully staffed, zero-footprint canvas camps set in exclusive wilderness zones.",
    stat: "0",
    statLabel: "Carbon footprint",
  },
  {
    icon: "photo_camera",
    title: "Photography Workshops",
    description: "Led by award-winning wildlife photographers. Perfect your techniques in golden-hour dynamic scenarios.",
    stat: "5★",
    statLabel: "Guest rating",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">

        {/* Editorial header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-outline-variant/30 pb-12">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block mb-4">
              NakTide Safaris & Expeditions
            </span>
            <h2 className="font-headline font-black text-5xl md:text-6xl text-on-surface tracking-tighter leading-none">
              What we<br />
              <span className="text-primary">offer.</span>
            </h2>
          </div>
          <div className="md:max-w-xs">
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              Every NakTide offering is designed for the discerning traveller who seeks depth over distance — not just a destination, but a transformation.
            </p>
            <Link href="/explore" className="text-xs font-black uppercase tracking-widest text-primary border-b border-primary pb-0.5 hover:opacity-70 transition-opacity">
              Browse all expeditions →
            </Link>
          </div>
        </div>

        {/* Service cards — 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/20">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="bg-surface-container-low p-10 group hover:bg-surface transition-colors duration-300 flex flex-col gap-6"
            >
              <div className="flex items-start justify-between">
                <span
                  className="material-symbols-outlined text-3xl text-primary group-hover:scale-110 transition-transform duration-300"
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
                >
                  {s.icon}
                </span>
                <div className="text-right">
                  <div className="font-headline font-black text-2xl text-on-surface leading-none">{s.stat}</div>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mt-0.5">{s.statLabel}</div>
                </div>
              </div>

              <div>
                <h3 className="font-headline font-black text-lg text-on-surface mb-3 tracking-tight">{s.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{s.description}</p>
              </div>

              <div className="mt-auto pt-4 border-t border-outline-variant/30">
                <span className="text-[10px] uppercase tracking-widest font-black text-on-surface-variant/50 group-hover:text-primary transition-colors">
                  Learn more →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
