"use client";
import React, { useState } from "react";
import Modal from "@/components/dashboard/Modal";

export default function MessagesPage() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  
  return (
    <div className="flex flex-col h-full gap-8">
      <header>
        <h1 className="text-4xl lg:text-5xl font-black font-headline tracking-tighter text-on-background uppercase italic text-primary underline decoration-primary/20 underline-offset-8">Explorer Messaging</h1>
        <p className="text-on-surface-variant font-medium mt-6 text-lg">Direct communication with your personal safari concierge.</p>
      </header>

      <div className="flex-1 bg-surface-container-low rounded-[3rem] p-1 overflow-hidden min-h-[500px] flex flex-col border border-outline-variant/10 shadow-none">
         <div className="flex-1 flex items-center justify-center p-10 lg:p-20 text-center">
            <div className="max-w-md">
               <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8 animate-pulse">
                 <span className="material-symbols-outlined text-5xl">chat_bubble</span>
               </div>
               <h3 className="text-3xl font-black font-headline text-on-background mb-4">Establishing Secret Link...</h3>
               <p className="text-on-surface-variant font-medium leading-relaxed">
                 Your secure channel to the NakTide team is being encrypted. You'll be able to discuss private itineraries and exclusive rewards here very soon.
               </p>
               <button 
                 onClick={() => setIsSupportModalOpen(true)}
                 className="mt-10 px-10 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-full shadow-xl hover:opacity-90 active:scale-95 transition-all"
               >
                 Request Urgent Support
               </button>
            </div>
         </div>
      </div>

      <Modal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
        title="Direct Concierge"
      >
        <div className="space-y-8">
           <div className="flex items-center gap-6 p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-3xl">headset_mic</span>
              </div>
              <div className="min-w-0">
                <p className="font-headline font-bold text-on-surface truncate">Immediate Assistance</p>
                <p className="text-xs text-on-surface-variant font-medium">You are connecting with our Nairobi HQ team.</p>
              </div>
           </div>

           <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest opacity-60 px-2 block mb-2">Issue Priority</label>
                <div className="flex flex-wrap gap-4">
                   {["Urgent", "Standard", "Inquiry"].map((p) => (
                     <button key={p} className="flex-1 min-w-[80px] py-3 bg-surface-container-low border border-outline-variant/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary transition-colors">
                       {p}
                     </button>
                   ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest opacity-60 px-2 block mb-2">Detailed Message</label>
                <textarea 
                  placeholder="How can we assist your expedition today?"
                  className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6 focus:border-primary focus:ring-0 transition-all h-32 text-sm font-medium"
                ></textarea>
              </div>
           </div>

           <button className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
             Initialize Secure Chat
           </button>
        </div>
      </Modal>
    </div>
  );
}
