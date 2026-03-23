import React from "react";
import AdventureCard from "./AdventureCard";

const ADVENTURES = [
  {
    id: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSpgpntRu0a-X13nYvg92IB5re2_ajQya7Nm3Slr_zNgkxty4eVZJJxjquixl65o3YWAbzCaxS9467rIMVnvdn2hS6YZ-KwwwR0gSdZB8v3Pq3ynqEDBswnzofGZr9l3W5Uo-3wIk32OJfjek-UhttWxZXNze7Po2MpoXGxKWKPMZNOnkIuZzi5b_-VUinNBdg_57EJkj1uS43DFElpzAWnswDKDFK9R_SJ-GRAJvekoPFTOF3FblYznJvqdY_l8VA-qxKsmRcLw",
    altText: "Close up of a majestic lion in tall grass",
    category: "Safari",
    location: "Tanzania",
    title: "The Serengeti Crossing",
    price: "$4,250",
    date: "Oct 12, 2024",
    slots: "4 slots left",
  },
  {
    id: 2,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSpgpntRu0a-X13nYvg92IB5re2_ajQya7Nm3Slr_zNgkxty4eVZJJxjquixl65o3YWAbzCaxS9467rIMVnvdn2hS6YZ-KwwwR0gSdZB8v3Pq3ynqEDBswnzofGZr9l3W5Uo-3wIk32OJfjek-UhttWxZXNze7Po2MpoXGxKWKPMZNOnkIuZzi5b_-VUinNBdg_57EJkj1uS43DFElpzAWnswDKDFK9R_SJ-GRAJvekoPFTOF3FblYznJvqdY_l8VA-qxKsmRcLw",
    altText: "Misty mountain range in Rwanda",
    category: "Trekking",
    location: "Rwanda",
    title: "Gorillas in the Mist",
    price: "$6,800",
    date: "Nov 05, 2024",
    slots: "2 slots left",
  },
  {
    id: 3,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSpgpntRu0a-X13nYvg92IB5re2_ajQya7Nm3Slr_zNgkxty4eVZJJxjquixl65o3YWAbzCaxS9467rIMVnvdn2hS6YZ-KwwwR0gSdZB8v3Pq3ynqEDBswnzofGZr9l3W5Uo-3wIk32OJfjek-UhttWxZXNze7Po2MpoXGxKWKPMZNOnkIuZzi5b_-VUinNBdg_57EJkj1uS43DFElpzAWnswDKDFK9R_SJ-GRAJvekoPFTOF3FblYznJvqdY_l8VA-qxKsmRcLw",
    altText: "Distant silhouette of an elephant against a dusty sunset",
    category: "Photography",
    location: "Botswana",
    title: "Okavango Delta Photo-Op",
    price: "$5,100",
    date: "Dec 20, 2024",
    slots: "8 slots left",
  },
];

export default function AdventureGrid() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-4xl font-black font-headline text-on-background tracking-tight">
            Future Adventures
          </h2>
          <p className="text-on-surface-variant mt-2 font-medium">
            Hand-picked destinations for the discerning traveler.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-primary hover:text-white transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="p-3 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-primary hover:text-white transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {ADVENTURES.map((adventure) => (
          <AdventureCard key={adventure.id} {...adventure} />
        ))}
      </div>
    </main>
  );
}
