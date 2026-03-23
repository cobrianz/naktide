import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-surface-container-high/95 backdrop-blur-md border-b border-outline-variant/30">
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-secondary text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            landscape
          </span>
          <div className="text-xl font-black text-on-background uppercase tracking-tighter font-headline">
            NakTide
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link
            className="text-on-surface-variant text-sm font-bold hover:text-primary transition-colors font-headline tracking-tight"
            href="/explore"
          >
            Destinations
          </Link>
          <Link
            className="text-on-surface-variant text-sm font-bold hover:text-primary transition-colors font-headline tracking-tight"
            href="#"
          >
            Experiences
          </Link>
          <Link
            className="text-on-surface-variant text-sm font-bold hover:text-primary transition-colors font-headline tracking-tight"
            href="#"
          >
            Journal
          </Link>
          <Link
            className="text-on-surface-variant text-sm font-bold hover:text-primary transition-colors font-headline tracking-tight"
            href="#"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-primary text-sm font-bold hover:text-[#ad2c00] transition-colors">
            Login
          </button>
          <button className="bg-on-background text-on-primary px-5 py-2 rounded-full text-sm font-bold hover:bg-inverse-surface transition-colors">
            Book Now
          </button>
        </div>
      </nav>
    </div>
  );
}
