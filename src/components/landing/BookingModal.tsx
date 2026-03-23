"use client";
import React, { useState, useEffect } from "react";
import { Adventure } from "@/api/adventures";

export default function BookingModal({ isOpen, onClose, adventure }: { isOpen: boolean, onClose: () => void, adventure: Adventure }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen && !isProcessing) {
      setProgress(0);
    }
  }, [isOpen, isProcessing]);

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { clearInterval(interval); return 100; }
          return p + 5;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-[100]" onClick={onClose}></div>
      
      {/* 16:9 Modal Container */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[110] w-full max-w-5xl md:h-[600px] bg-surface-container-lowest shadow-2xl overflow-hidden flex flex-col md:flex-row rounded-xl border border-outline-variant/30">
        
        {/* Left Side: Editorial Image/Brand */}
        <div className="hidden md:block w-2/5 relative overflow-hidden bg-surface-dim">
          <img alt={adventure.altText} className="absolute inset-0 w-full h-full object-cover" src={adventure.image} />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10">
            <span className="font-label text-xs tracking-[0.15rem] text-primary-fixed mb-2 block uppercase">NakTide Checkout</span>
            <h1 className="font-headline text-3xl font-black text-white leading-tight tracking-tighter">Confirm Your Journey to {adventure.location}</h1>
          </div>
        </div>
        
        {/* Right Side: Confirmation Details & Payment */}
        <div className="flex-1 flex flex-col p-8 md:p-12 overflow-y-auto bg-surface-container-lowest">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight">Booking Summary</h2>
              <p className="text-on-surface-variant text-sm mt-1">Review your safari details before processing payment.</p>
            </div>
            <button onClick={onClose} className="text-on-surface-variant hover:text-primary transition-colors bg-surface-container h-8 w-8 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
          
          {/* Order Summary Bento */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-surface-container-low p-5 rounded-lg border-b-2 border-outline-variant/20">
              <span className="font-label text-[10px] font-bold tracking-widest text-on-surface-variant uppercase block mb-1">Participants</span>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">group</span>
                <span className="font-headline font-bold text-lg">01 Explorer</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-5 rounded-lg border-b-2 border-outline-variant/20">
              <span className="font-label text-[10px] font-bold tracking-widest text-on-surface-variant uppercase block mb-1">Duration</span>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-xl">schedule</span>
                <span className="font-headline font-bold text-lg text-secondary">{adventure.duration}</span>
              </div>
            </div>
            <div className="col-span-2 bg-surface-container-highest p-6 rounded-lg flex justify-between items-end border border-outline-variant/10">
              <div>
                <span className="font-label text-[10px] font-bold tracking-widest text-on-surface-variant uppercase block mb-1">Total Expedition Cost</span>
                <p className="text-xs text-on-surface-variant">Includes taxes and park conservation fees</p>
              </div>
              <div className="text-right">
                <span className="font-headline text-4xl font-black text-primary tracking-tighter">{adventure.price}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Form */}
          <div className="space-y-6 flex-grow">
            <div className="group">
              <label className="block font-label text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wide">M-Pesa Phone Number</label>
              <div className="relative flex items-center bg-surface-container-high rounded p-1 transition-all group-focus-within:ring-2 ring-primary/20">
                <span className="pl-4 pr-2 font-headline font-bold text-on-surface-variant">+254</span>
                <input 
                  className="w-full bg-transparent border-none focus:ring-0 py-3 font-headline text-lg font-medium tracking-wide placeholder:text-on-surface-variant/40 outline-none text-on-surface" 
                  placeholder="712 345 678" 
                  type="tel" 
                  disabled={isProcessing} 
                />
                <div className="pr-4">
                  <span className="material-symbols-outlined text-on-surface-variant">smartphone</span>
                </div>
              </div>
              <div className="h-[2px] w-full bg-outline-variant/20 mt-1">
                <div className="h-full bg-primary w-0 group-focus-within:w-full transition-all duration-500"></div>
              </div>
            </div>
            
            <div className="space-y-3">
              {!isProcessing ? (
                <button 
                  onClick={() => setIsProcessing(true)}
                  className="bg-gradient-to-br from-[#ad2c00] to-[#d34011] w-full py-4 text-white font-headline font-extrabold text-lg rounded-xl shadow-lg hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                  Pay with M-Pesa
                </button>
              ) : (
                <div className="pt-4 animate-in fade-in duration-500">
                  <div className="flex justify-between text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                    <span>Awaiting Confirmation</span>
                    <span className="text-primary font-black">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full relative transition-all duration-300" style={{ width: `${progress}%` }}>
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-center text-[11px] text-on-surface-variant/60 mt-4 italic font-medium">
                    Please check your handset for the M-Pesa STK push notification
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-outline-variant/10 flex items-center gap-3 text-on-surface-variant/40">
            <span className="material-symbols-outlined text-base">verified_user</span>
            <span className="text-[10px] font-medium tracking-tight uppercase">Secure Transaction Encrypted by NakTide Protocol</span>
          </div>
        </div>
      </div>
    </>
  );
}
