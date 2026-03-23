"use client";
import React from "react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <span className="text-primary font-headline font-bold text-xs tracking-[0.2em] uppercase mb-2 block">
            Explorer Overview
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-on-background tracking-tighter">Jambo, Julian!</h1>
          <p className="text-on-surface-variant mt-2 font-medium">Welcome back to the NakTide expedition portal.</p>
        </div>
        <div className="flex items-center gap-4 bg-surface-container-low px-6 py-3 rounded-2xl text-on-surface-variant text-sm font-bold border border-outline-variant/5">
          <span className="material-symbols-outlined text-primary">calendar_month</span>
          <span>June 12, 2024</span>
          <span className="w-1 h-1 bg-outline-variant/30 rounded-full"></span>
          <span>Serengeti, TZ</span>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Profile Summary */}
        <div className="md:col-span-8 bg-surface-container-lowest p-8 lg:p-12 rounded-3xl border border-outline-variant/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12 relative z-10">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 opacity-60">
                Explorer
              </p>
              <p className="font-headline font-bold text-xl text-on-surface">Julian Alexander Vance</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 opacity-60">
                Account ID
              </p>
              <p className="font-headline font-bold text-xl text-on-surface tracking-tight">j.vance@naktide.com</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 opacity-60">
                Primary Contact
              </p>
              <p className="font-headline font-bold text-xl text-on-surface">+1 (555) 012-8843</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-black mb-2 opacity-60">
                Voyager Since
              </p>
              <p className="font-headline font-bold text-xl text-on-surface">October 2021</p>
            </div>
          </div>
        </div>

        {/* Points Balance */}
        <div className="md:col-span-4 bg-primary text-white p-8 lg:p-12 rounded-3xl flex flex-col justify-between relative overflow-hidden">
           <div className="absolute -bottom-8 -right-8 opacity-10">
             <span className="material-symbols-outlined text-[12rem]">stars</span>
           </div>
          <div className="relative z-10">
            <span className="material-symbols-outlined text-4xl lg:text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            <p className="text-[10px] uppercase tracking-widest opacity-80 font-black mb-1">Savannah Gold Points</p>
            <p className="text-4xl lg:text-6xl font-black font-headline tracking-tighter">14,250</p>
          </div>
          <div className="pt-6 border-t border-white/20 relative z-10 mt-8">
            <p className="text-xs opacity-90 leading-relaxed font-medium">
              You're only <span className="font-bold underline">750 points</span> away from your next private safari reward.
            </p>
          </div>
        </div>
      </div>

      {/* Adventure History */}
      <section className="mt-4">
        <div className="flex justify-between items-center mb-8">
          <div>
             <h2 className="text-3xl font-black tracking-tighter text-on-surface">Recent Expeditions</h2>
             <p className="text-sm text-on-surface-variant font-medium mt-1">Your latest registered safari activity.</p>
          </div>
          <Link href="/dashboard/bookings" className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-2 group transition-all">
            See History <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/10 shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-surface-container-low/30">
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-on-surface-variant font-black">
                    Adventure Designation
                  </th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-on-surface-variant font-black">
                    Timeline
                  </th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-on-surface-variant font-black text-center">
                    Party Size
                  </th>
                  <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-on-surface-variant font-black text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {[
                  {
                    name: "Maasai Mara Sky Expedition",
                    date: "Aug 14 - 21, 2024",
                    attendees: "2 Adults",
                    price: "Ksh 630,500",
                    status: "Confirmed",
                    img: "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg",
                  },
                  {
                    name: "Gorilla Trekking Bwindi",
                    date: "Jan 05 - 12, 2024",
                    attendees: "1 Adult",
                    price: "Ksh 416,000",
                    status: "Completed",
                    img: "https://images.pexels.com/photos/33231637/pexels-photo-33231637.jpeg",
                  },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-surface-container/20 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-outline-variant/10">
                          <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={item.img} alt={item.name} />
                        </div>
                        <div>
                           <span className="font-headline font-bold text-base text-on-surface">{item.name}</span>
                           <div className="mt-1">
                             <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                               item.status === "Confirmed" ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container-high text-on-surface-variant"
                             }`}>
                               {item.status}
                             </span>
                           </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-on-surface-variant/80 whitespace-nowrap">{item.date}</td>
                    <td className="px-8 py-6 text-sm font-bold text-on-surface-variant text-center">{item.attendees}</td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-on-surface-variant hover:text-primary p-2 rounded-xl transition-colors">
                        <span className="material-symbols-outlined text-xl">open_in_new</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Activity Logs & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mt-6 mb-12">
        <div className="space-y-6">
           <h3 className="text-xl font-black tracking-tight text-on-surface">Experience Points Log</h3>
           <div className="space-y-3">
              {[
                { label: "Wildlife Photography Bonus", date: "June 10", val: "+250", pos: true },
                { label: "Safari Booking Reward", date: "May 28", val: "+1,200", pos: true }
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center p-5 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl group hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-sm">trending_up</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-on-surface truncate">{log.label}</p>
                      <p className="text-[10px] text-on-surface-variant/60 font-black uppercase tracking-widest">{log.date}</p>
                    </div>
                  </div>
                  <span className="font-headline font-black text-secondary shrink-0 ml-4">{log.val}</span>
                </div>
              ))}
           </div>
        </div>
        
        <div className="bg-inverse-surface text-inverse-on-surface p-8 lg:p-10 rounded-3xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-full h-full opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000">
             <img src="https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg" className="w-full h-full object-cover" />
           </div>
           <div className="relative z-10 flex flex-col h-full justify-between gap-12">
              <div>
                <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4 inline-block">Pro Voyager Tip</span>
                <h4 className="text-2xl font-black font-headline leading-tight">Maximize your points this season in the Serengeti.</h4>
                <p className="text-white/60 text-sm mt-4 leading-relaxed">Book a nocturnal photography safari during the new moon to earn double rewards and exclusive badge status.</p>
              </div>
              <button className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-primary hover:text-white transition-colors">
                Explore Safaris <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
