import React from "react";

export default function NoticeBanner() {
  return (
    <div className="pt-[88px] bg-secondary-container text-on-secondary-container px-6 py-3 flex items-center justify-center gap-3">
      <span className="material-symbols-outlined text-xl border border-on-secondary-container/20 p-1 rounded-full">campaign</span>
      <span className="font-bold text-sm tracking-wide">
        NOTICE: New Seronera Valley expedition routes are now open for 2025 bookings.
      </span>
    </div>
  );
}
