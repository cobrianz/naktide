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
            alt="Modern eco-lodge with wood accents and large windows overlooking the plains"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSpgpntRu0a-X13nYvg92IB5re2_ajQya7Nm3Slr_zNgkxty4eVZJJxjquixl65o3YWAbzCaxS9467rIMVnvdn2hS6YZ-KwwwR0gSdZB8v3Pq3ynqEDBswnzofGZr9l3W5Uo-3wIk32OJfjek-UhttWxZXNze7Po2MpoXGxKWKPMZNOnkIuZzi5b_-VUinNBdg_57EJkj1uS43DFElpzAWnswDKDFK9R_SJ-GRAJvekoPFTOF3FblYznJvqdY_l8VA-qxKsmRcLw"
          />
        </div>
        <div className="lg:col-span-5">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
            Our Philosophy
          </span>
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
