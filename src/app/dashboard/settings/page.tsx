"use client";
import React from "react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-4xl lg:text-5xl font-black font-headline tracking-tighter text-on-background uppercase italic">NakTide Settings</h1>
        <p className="text-on-surface-variant font-medium mt-4 text-lg">Manage your profile, security, and notification preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Profile Settings */}
        <section className="lg:col-span-8 bg-surface-container-lowest p-6 sm:p-10 lg:p-14 rounded-[2.5rem] lg:rounded-[3.5rem] border border-outline-variant/10 transition-all hover:border-primary/20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-black font-headline text-on-background tracking-tight">Profile Details</h2>
            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">person_edit</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="relative group shrink-0">
               <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-low shadow-xl transition-transform group-hover:scale-105">
                 <img 
                   className="w-full h-full object-cover" 
                   src="https://i.pravatar.cc/150?u=julian" 
                 />
               </div>
               <button className="absolute bottom-1 right-1 p-3 bg-primary text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all">
                 <span className="material-symbols-outlined text-sm">photo_camera</span>
               </button>
            </div>

            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.2rem] text-on-surface-variant mb-2 opacity-60">Display Name</label>
                <input 
                  className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant/20 focus:border-primary py-4 px-0 focus:ring-0 transition-all font-headline font-bold text-lg text-on-surface" 
                  type="text" 
                  defaultValue="Julian Alexander Vance"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.2rem] text-on-surface-variant mb-2 opacity-60">Phone Number</label>
                <input 
                  className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant/20 focus:border-primary py-4 px-0 focus:ring-0 transition-all font-headline font-bold text-lg text-on-surface" 
                  type="tel" 
                  defaultValue="+1 (555) 012-3456"
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.2rem] text-on-surface-variant mb-2 opacity-60">Journal Signature</label>
                <input 
                  className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant/20 focus:border-primary py-4 px-0 focus:ring-0 transition-all font-headline font-bold text-lg text-on-surface italic" 
                  type="text" 
                  defaultValue="Wanderer by choice, explorer by heart."
                />
              </div>
            </div>
          </div>

          <div className="mt-14 flex justify-end">
            <button className="px-10 py-5 bg-on-background text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-xl hover:bg-primary transition-all active:scale-95">
              Update Profile
            </button>
          </div>
        </section>

        {/* Security & Preferences Column */}
        <aside className="lg:col-span-4 flex flex-col gap-8 lg:gap-10">
           <section className="bg-surface-container-low p-8 lg:p-10 rounded-[2.5rem] border border-outline-variant/5">
              <h3 className="text-xl font-black font-headline text-on-background mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">notifications_active</span> Preferences
              </h3>
              <div className="space-y-8">
                {[
                  { title: "Safari Updates", desc: "Instant booking alerts", active: true },
                  { title: "Voyager Journal", desc: "Weekly inspiration", active: false },
                  { title: "Exclusive Offers", desc: "Rank-based discounts", active: true },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div>
                      <p className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">{pref.title}</p>
                      <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-40">{pref.desc}</p>
                    </div>
                    <button className={`w-12 h-6 rounded-full relative p-1 transition-all ${pref.active ? 'bg-primary' : 'bg-surface-dim'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${pref.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-5 bg-white rounded-2xl border-l-4 border-primary shadow-sm">
                <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">Voyager Perk</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed font-bold italic">
                  Level 4 Voyagers get complimentary concierge support via SMS.
                </p>
              </div>
           </section>

           <section className="bg-error/5 p-10 rounded-[2.5rem] border border-error/10">
              <h3 className="text-xl font-black font-headline text-error mb-4">Danger Zone</h3>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed mb-6">Permanently deactivate your NakTide account and delete all data.</p>
              <button className="w-full py-4 border-2 border-error/20 text-error text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-error hover:text-white transition-all">
                Deactivate Account
              </button>
           </section>
        </aside>
      </div>
    </div>
  );
}
