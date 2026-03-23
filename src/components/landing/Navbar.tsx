import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-6 w-full z-50 flex justify-center px-4">
      <nav className="flex justify-between items-center w-full max-w-6xl bg-surface-container-high/90 backdrop-blur-md px-6 py-3 rounded-full border border-outline-variant/30">
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

        <div className="hidden md:flex items-center bg-surface-container-lowest/50 backdrop-blur-sm px-6 py-2 rounded-full gap-8 border border-outline-variant/20">
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
            Dashboard
          </button>
        </div>
      </nav>
    </div>
  );
}
