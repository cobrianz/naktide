"use client";
import React, { useState } from "react";
import { Adventure } from "@/api/adventures";
import BookingModal from "./BookingModal";

export default function BookingSidebar({ adventure }: { adventure: Adventure }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="md:col-span-4 h-fit sticky top-32 space-y-8">
        <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10"></div>
          
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Secure Your Spot</span>
          <div className="text-4xl font-headline font-black text-on-surface mb-6">
            {adventure.price} <span className="text-sm text-on-surface-variant font-medium">/ person</span>
          </div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-4">
              <span className="material-symbols-outlined text-secondary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
              <div>
                <span className="block text-sm font-bold text-on-surface">Departs</span>
                <span className="text-sm text-on-surface-variant">{adventure.date}</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="material-symbols-outlined text-secondary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              <div>
                <span className="block text-sm font-bold text-on-surface">Group Limit</span>
                <span className="text-sm text-on-surface-variant">{adventure.groupSize}</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="material-symbols-outlined text-secondary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              <div>
                <span className="block text-sm font-bold text-on-surface">Availability</span>
                <span className="text-sm font-bold text-primary">{adventure.slots}</span>
              </div>
            </li>
          </ul>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors shadow-lg shadow-primary/20 mb-4"
          >
            Confirm & Pay
          </button>
          <button className="w-full border-2 border-outline-variant/30 text-on-surface font-bold py-4 rounded-xl hover:bg-surface-container transition-colors">
            Ask a Question
          </button>

          <p className="text-center text-[10px] uppercase tracking-widest text-on-surface-variant mt-6">
            No charge right now. Payment held securely.
          </p>
        </div>

        {/* Small Trust Banner */}
        <div className="bg-surface-container-highest rounded-2xl p-6 flex items-center gap-4 border border-outline-variant/30">
          <span className="material-symbols-outlined text-secondary text-3xl">verified_user</span>
          <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
            All expeditions are covered by our Savannah-First Guarantee. Full refunds up to 60 days before travel.
          </p>
        </div>
      </div>
      
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} adventure={adventure} />
    </>
  );
}
