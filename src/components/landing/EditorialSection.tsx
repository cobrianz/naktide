import React from "react";
import Link from "next/link";

export default function EditorialSection() {
  return (
    <section className="bg-surface-container-low py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 relative">
          <div className="bg-primary w-full h-full absolute -top-8 -left-8 rounded-xl opacity-10"></div>
          <img
            className="relative z-10 w-full rounded-xl"
            alt="Majestic safari landscape"
            src="https://images.pexels.com/photos/34800172/pexels-photo-34800172.jpeg"
          />
        </div>
        <div className="lg:col-span-5">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-6 block">
            Our Philosophy
          </span>
          <div className="mb-6 w-24 h-24 rounded-full overflow-hidden border-2 border-outline-variant/30">
            <img 
              src="https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=300" 
              className="w-full h-full object-cover" 
              alt="Safari Guide" 
            />
          </div>
          <h2 className="text-5xl font-black font-headline text-on-background leading-none mb-8">
            Travel with <br />
            Authority.
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
            We believe an adventure should be more than just a trip—it should be a narrative. Our
            expeditions are led by experts in wildlife biology and documentary photography.
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="font-bold">100% Carbon Neutral Expeditions</span>
            </li>
            <li className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="font-bold">Private Expert-Led Workshops</span>
            </li>
            <li className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="font-bold">Exclusive Access to Protected Reserves</span>
            </li>
          </ul>
          <Link
            className="text-primary font-black uppercase tracking-widest text-sm flex items-center gap-2 group"
            href="#"
          >
            View Sustainability Report
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
              arrow_right_alt
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
