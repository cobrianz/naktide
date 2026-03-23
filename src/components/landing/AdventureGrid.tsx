import React from "react";
import AdventureCard from "./AdventureCard";

const ADVENTURES = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg?auto=compress&cs=tinysrgb&w=800",
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
      "https://images.pexels.com/photos/4034871/pexels-photo-4034871.jpeg?auto=compress&cs=tinysrgb&w=800",
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
      "https://images.pexels.com/photos/1670984/pexels-photo-1670984.jpeg?auto=compress&cs=tinysrgb&w=800",
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
