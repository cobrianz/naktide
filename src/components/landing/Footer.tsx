import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full pt-16 pb-8 font-body">
      <div className="flex flex-col items-center gap-8 px-8 max-w-7xl mx-auto">
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <div className="text-3xl font-black text-on-background uppercase tracking-tighter mb-6 font-headline">
              NakTide
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              Curating the world's most intentional wilderness experiences since 2012. Join the
              expedition.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4">
              <h4 className="text-on-background font-bold uppercase tracking-widest text-xs">
                Explore
              </h4>
              <Link className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">
                Destinations
              </Link>
              <Link className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">
                Sustainability
              </Link>
              <Link className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">
                Journal
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-on-background font-bold uppercase tracking-widest text-xs">
                Company
              </h4>
              <Link className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">
                Contact Us
              </Link>
              <Link className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">
                Careers
              </Link>
              <Link className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">
                Travel Insurance
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-on-background font-bold uppercase tracking-widest text-xs">
                Legal
              </h4>
              <Link className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">
                Terms of Service
              </Link>
              <Link className="text-on-surface-variant text-sm hover:text-primary transition-colors" href="#">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full border-t border-outline-variant/20 pt-12 mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            <Link className="text-on-surface-variant hover:text-primary transition-all" href="#">
              <span className="material-symbols-outlined">social_leaderboard</span>
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all" href="#">
              <span className="material-symbols-outlined">photo_camera</span>
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all" href="#">
              <span className="material-symbols-outlined">brand_awareness</span>
            </Link>
          </div>
          <div className="text-on-surface-variant text-sm font-medium tracking-wide">
            © 2024 NakTide Expeditions. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
