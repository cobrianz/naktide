import React from "react";

export default function NoticeBanner() {
  return (
    <div className="pt-20 bg-secondary-container text-on-secondary-container px-6 py-3 flex items-center justify-center gap-3">
      {/* Changed mt-20 to pt-20 on notice banner so it fits under absolute navbar better, or kept mt-20 if appropriate */}
      <span className="material-symbols-outlined text-xl">campaign</span>
      <span className="font-medium text-sm tracking-wide">
        NOTICE: New Seronera Valley expedition routes are now open for 2025 bookings.
      </span>
    </div>
  );
}
