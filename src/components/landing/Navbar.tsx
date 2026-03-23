"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Explore", href: "/explore" },
    { label: "Past Adventures", href: "/past-adventures" },
    { label: "Gallery", href: "/gallery" },
    { label: "Journal", href: "#" },
    { label: "About", href: "#" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled || isMobileMenuOpen
          ? "bg-white/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto px-6 py-4 relative z-50">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className={`material-symbols-outlined text-3xl group-hover:scale-110 transition-all ${
                scrolled || isMobileMenuOpen ? "text-secondary" : "text-white"
              }`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              landscape
            </span>
            <div
              className={`text-xl font-black uppercase tracking-tighter font-headline transition-colors ${
                scrolled || isMobileMenuOpen ? "text-on-background" : "text-white"
              }`}
            >
              NakTide
            </div>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
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

        {/* Auth CTAs & Mobile Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/auth/login"
              className={`text-sm font-bold transition-colors hover:text-primary ${
                scrolled ? "text-on-background" : "text-white/80 hover:text-white"
              }`}
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className={`px-5 py-2 rounded-full text-sm font-bold transition-colors shadow-sm active:scale-95 ${
                scrolled
                  ? "bg-primary text-white hover:bg-primary-container"
                  : "bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20"
              }`}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled || isMobileMenuOpen ? "bg-surface-container-high text-on-background" : "bg-white/10 text-white"
            }`}
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-outline-variant/10 shadow-xl z-40 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              <div className="flex flex-col gap-4">
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-bold font-headline text-on-background hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="h-px w-full bg-outline-variant/10" />
              <div className="flex flex-col gap-4">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-lg font-bold font-headline text-on-background"
                >
                  Login <span className="material-symbols-outlined">login</span>
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-primary text-white text-center py-4 rounded-xl font-headline font-bold"
                >
                  Join the Tribe
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
