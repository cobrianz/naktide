"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type NavbarClientProps = {
  signedIn: boolean;
  accountHref: string;
  accountLabel: string;
};

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Journal", href: "/journal" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NavbarClient({ signedIn, accountHref, accountLabel }: NavbarClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const chrome = true;

  return (
    <div className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${chrome ? "bg-[#f8f4ec]/88 shadow-[0_16px_40px_rgba(26,28,25,0.08)] backdrop-blur-xl" : "bg-transparent"}`}>
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 lg:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${chrome ? "border-primary/15 bg-white text-primary" : "border-white/20 bg-white/10 text-white"}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>landscape</span>
          </div>
          <div>
            <p className={`font-headline text-2xl font-bold tracking-tight ${chrome ? "text-on-background" : "text-white"}`}>NakTide</p>
            <p className={`text-[10px] uppercase tracking-[0.35em] ${chrome ? "text-on-surface-variant" : "text-white/70"}`}>Kenya safari house</p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm font-semibold transition-colors ${chrome ? "text-[#4c453c] hover:text-primary" : "text-white/82 hover:text-white"}`}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href={accountHref} className={`rounded-full px-4 py-2 text-sm font-semibold ${signedIn ? "border border-primary/15 bg-white text-primary" : chrome ? "text-on-background" : "text-white"}`}>
            {accountLabel}
          </Link>
          <Link href="/contact" className={`rounded-full px-5 py-2.5 text-sm font-semibold ${chrome ? "bg-primary text-white" : "border border-white/20 bg-white/10 text-white backdrop-blur"}`}>
            Plan my safari
          </Link>
        </div>

        <button className={`rounded-xl p-2 lg:hidden ${chrome ? "bg-white text-on-background" : "bg-white/10 text-white"}`} onClick={() => setMobileOpen((value) => !value)}>
          <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="border-t border-outline-variant/20 bg-[#f8f4ec] px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-on-background shadow-sm">
                  {link.label}
                </Link>
              ))}
              <Link href={accountHref} onClick={() => setMobileOpen(false)} className={`rounded-xl px-4 py-3 text-sm font-semibold ${signedIn ? "bg-white text-primary shadow-sm" : "border border-outline-variant/20 text-on-background"}`}>
                {accountLabel}
              </Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white">Plan my safari</Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
