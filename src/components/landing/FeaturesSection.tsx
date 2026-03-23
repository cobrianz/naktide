import React from "react";

const FEATURES = [
  {
    icon: "explore",
    title: "Expert Local Guides",
    description: "Our expeditions are led by seasoned biologists and trackers who read the wilderness like a book.",
  },
  {
    icon: "directions_car",
    title: "Custom Built Vehicles",
    description: "Travel in uncompromised comfort. Our fleet is modified for optimal photography angles and smooth traversing.",
  },
  {
    icon: "eco",
    title: "Radical Conservation",
    description: "Every journey directly funds anti-poaching units and local community empowerment projects.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
            The NakTide Difference
          </span>
          <h2 className="text-4xl md:text-5xl font-black font-headline text-on-background tracking-tight">
            Designed for the Discerning.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold font-headline mb-3 text-on-background">{feature.title}</h3>
              <p className="text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
