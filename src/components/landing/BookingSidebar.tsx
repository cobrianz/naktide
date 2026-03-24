"use client";

import Link from "next/link";
import React, { useState } from "react";

import type { Adventure } from "@/api/adventures";
import BookingModal from "./BookingModal";

export default function BookingSidebar({ adventure }: { adventure: Adventure }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="sticky top-32 h-fit space-y-8 md:col-span-4">
        <div className="relative overflow-hidden rounded-3xl border border-outline-variant/30 bg-surface-container-low p-8 shadow-sm">
          <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-bl-full bg-primary/10" />

          <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-primary">Secure Your Spot</span>
          <div className="mb-6 text-4xl font-black text-on-surface font-headline">
            {adventure.price} <span className="text-sm font-medium text-on-surface-variant">/ person</span>
          </div>

          <ul className="mb-8 space-y-4">
            <li className="flex items-start gap-4">
              <span className="material-symbols-outlined mt-0.5 text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
              <div>
                <span className="block text-sm font-bold text-on-surface">Departs</span>
                <span className="text-sm text-on-surface-variant">{adventure.date}</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="material-symbols-outlined mt-0.5 text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              <div>
                <span className="block text-sm font-bold text-on-surface">Group Limit</span>
                <span className="text-sm text-on-surface-variant">{adventure.groupSize}</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="material-symbols-outlined mt-0.5 text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              <div>
                <span className="block text-sm font-bold text-on-surface">Availability</span>
                <span className="text-sm font-bold text-primary">{adventure.slots}</span>
              </div>
            </li>
          </ul>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-4 w-full rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-fixed hover:text-on-primary-fixed"
            type="button"
          >
            Book this safari
          </button>
          <Link href="/contact" className="inline-flex w-full items-center justify-center rounded-xl border-2 border-outline-variant/30 py-4 font-bold text-on-surface transition-colors hover:bg-surface-container">
            Ask a question
          </Link>

          <p className="mt-6 text-center text-[10px] uppercase tracking-widest text-on-surface-variant">
            Booking requests are saved directly to your traveler dashboard.
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-highest p-6">
          <span className="material-symbols-outlined text-3xl text-secondary">verified_user</span>
          <p className="text-xs font-medium leading-relaxed text-on-surface-variant">
            All expeditions are covered by our Savannah-First Guarantee. Full refunds up to 60 days before travel.
          </p>
        </div>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} adventure={adventure} />
    </>
  );
}
