"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className={`material-symbols-outlined text-3xl group-hover:scale-110 transition-all ${scrolled ? "text-secondary" : "text-white"}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              landscape
            </span>
            <div className={`text-xl font-black uppercase tracking-tighter font-headline transition-colors ${scrolled ? "text-on-background" : "text-white"}`}>
              NakTide
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Explore", href: "/explore" },
            { label: "Past Adventures", href: "/past-adventures" },
            { label: "Gallery", href: "/gallery" },
            { label: "Journal", href: "#" },
            { label: "About", href: "#" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              className={`text-sm font-bold transition-colors font-headline tracking-tight hover:text-primary ${
                scrolled ? "text-on-surface-variant" : "text-white/80 hover:text-white"
              }`}
              href={href}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button className={`text-sm font-bold transition-colors hover:text-primary ${scrolled ? "text-primary" : "text-white/80 hover:text-white"}`}>
            Login
          </button>
          <button className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
            scrolled
              ? "bg-on-background text-on-primary hover:bg-inverse-surface"
              : "bg-white/15 text-white border border-white/30 backdrop-blur-md hover:bg-white/25"
          }`}>
            Book Now
          </button>
        </div>
      </nav>
    </div>
  );
}
