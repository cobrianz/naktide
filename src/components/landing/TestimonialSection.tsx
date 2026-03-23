import React from "react";

export default function TestimonialSection() {
  return (
    <section className="bg-surface-container-high py-24 sm:py-32 relative overflow-hidden">
      {/* Decorative quotes background */}
      <span className="absolute -top-10 -left-10 text-[200px] text-outline-variant/10 font-serif leading-none select-none">
        "
      </span>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="flex justify-center gap-1 text-primary mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
          ))}
        </div>
        
        <blockquote className="text-3xl md:text-5xl font-headline font-medium text-on-background leading-tight mb-10">
          "The most profound experience of our lives. NakTide didn't just show us the wildlife; they immersed us in the timeless rhythm of the savannah."
        </blockquote>
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary">
            <img 
              src="https://images.pexels.com/photos/1138903/pexels-photo-1138903.jpeg?auto=compress&cs=tinysrgb&w=150" 
              alt="Portrait of Eleonora" 
              className="w-full h-full object-cover"
            />
          </div>
          <cite className="not-italic font-bold text-on-background tracking-wide">
            Eleonora & James
          </cite>
          <span className="text-sm text-on-surface-variant font-medium mt-1">
            Private Serengeti Expedition, 2023
          </span>
        </div>
      </div>
    </section>
  );
}
