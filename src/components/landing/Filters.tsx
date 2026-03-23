import React from "react";

export default function Filters() {
  return (
    <section className="relative z-20 max-w-6xl mx-auto px-6">
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-xl border border-outline-variant/30 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            Destination
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-0 text-primary">
              location_on
            </span>
            <input
              className="w-full pl-8 py-2 bg-transparent border-b-2 border-outline-variant/20 focus:border-primary focus:ring-0 outline-none text-on-surface font-semibold"
              placeholder="Where to?"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            Date Range
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-0 text-primary">
              calendar_today
            </span>
            <input
              className="w-full pl-8 py-2 bg-transparent border-b-2 border-outline-variant/20 focus:border-primary focus:ring-0 outline-none text-on-surface font-semibold"
              placeholder="Select dates"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            Price Range
          </label>
          <div className="flex items-center gap-4 mt-2">
            <input className="w-full accent-primary" type="range" />
            <span className="text-sm font-bold text-primary">$5k+</span>
          </div>
        </div>
        <div className="flex items-end">
          <button className="w-full savannah-gradient text-on-primary py-2 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95">
            <span className="material-symbols-outlined text-sm">search</span>
            Find Safaris
          </button>
        </div>
      </div>
    </section>
  );
}
