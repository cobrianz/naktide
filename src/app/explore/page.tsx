import React from "react";
import Link from "next/link";

import Navbar from "@/components/landing/Navbar";
import Filters from "@/components/landing/Filters";
import AdventureGrid from "@/components/landing/AdventureGrid";
import Footer from "@/components/landing/Footer";

const routeSignals = [
  {
    title: "Classic Kenya",
    body: "Mara, Amboseli, Laikipia, and Samburu shaped for first-time and return safari travelers.",
  },
  {
    title: "Regional extensions",
    body: "Rwanda, Uganda, Botswana, Namibia, and Tanzania folded into Kenya-led itineraries without losing pacing.",
  },
  {
    title: "Photography routes",
    body: "Vehicle setup, camp positioning, and light-aware movement designed for image-making rather than volume.",
  },
];

const planningSteps = [
  "Choose your safari month and wildlife priority",
  "Match parks to your energy, budget, and photography goals",
  "Refine camps, transfers, and timing with the Nairobi desk",
];

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-on-background">
      <Navbar />

      <section className="relative flex min-h-[720px] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <img
            src="https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Explore the wild"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/20"></div>
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-[1500px] gap-16 px-6 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div className="text-left">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-primary-fixed drop-shadow-sm">
              Discover your path
            </span>
            <h1 className="font-headline text-6xl font-black tracking-tighter text-white drop-shadow-lg md:text-7xl xl:text-[6.5rem]">
              Explore Kenya
              <br />
              and Beyond.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/82">
              Built from Nairobi, NakTide designs safari routes that feel precise rather than crowded. Explore migration safaris, gorilla permits, private conservancies, and archive-led expeditions with room for real field time.
            </p>
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-black text-white">18</p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/70">Curated routes</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-black text-white">9</p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/70">East Africa circuits</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-black text-white">24/7</p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/70">Concierge cover</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 self-end sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.28em] text-white/65">Safari intelligence</p>
              <p className="mt-4 text-2xl font-black text-white">Migration, conservancy, fly-camp, and photography itineraries shaped from Kenya first.</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/15 bg-[#d29145]/20 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.28em] text-white/65">Routing logic</p>
              <p className="mt-4 text-lg font-semibold text-white">Each itinerary is planned around light, wildlife behavior, and minimal dead transfer time.</p>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 pb-0">
        <div className="relative z-20 mb-24 -mt-14">
          <Filters />
        </div>

        <section className="mx-auto max-w-[1500px] px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {routeSignals.map((signal) => (
              <div key={signal.title} className="rounded-[1.75rem] border border-outline-variant/20 bg-white/75 p-7">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Route type</p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-on-background">{signal.title}</h2>
                <p className="mt-4 text-sm leading-7 text-on-surface-variant">{signal.body}</p>
              </div>
            ))}
          </div>
        </section>

        <AdventureGrid />

        <section className="mt-20 bg-[#f7efe0] px-6 py-24">
          <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">How we build routes</p>
              <h2 className="mt-4 font-headline text-5xl font-black tracking-tight text-[#23180d]">Safari planning that behaves well on the ground.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#6d5c48]">We design around transfer hours, park density, guide strengths, and the kind of moments you actually want from the trip. That applies whether you want migration drama, elephant landscapes, or a regional safari with multiple countries.</p>
            </div>
            <div className="space-y-4">
              {planningSteps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-[1.5rem] border border-[#e4d5bf] bg-[#fffaf2] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-white">{index + 1}</div>
                  <p className="text-base font-semibold text-[#23180d]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24 rounded-t-[3rem] bg-surface-container-low px-6 py-28">
          <div className="mx-auto grid max-w-[1500px] items-center gap-16 md:grid-cols-2">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">The NakTide difference</span>
              <h2 className="mb-6 font-headline text-5xl font-black md:text-6xl">Expertise in the Wild</h2>
              <p className="mb-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant">Every NakTide guide is accredited by the Field Guides Association. We build safari plans around the realities of East African field logistics, not brochure pacing, so your days feel deliberate and premium from Nairobi onward.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary">check_circle</span> <span className="font-bold text-sm">Custom 4x4 off-road vehicles</span></li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary">check_circle</span> <span className="font-bold text-sm">Carbon negative operations</span></li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary">check_circle</span> <span className="font-bold text-sm">Deep community integration</span></li>
              </ul>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-[1.75rem] shadow-lg">
              <img src="https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg" className="h-full w-full object-cover" alt="Expertise" />
            </div>
          </div>
        </section>

        <section className="bg-[#1a1c19] px-6 py-20 text-white">
          <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f3b38d]">Need help choosing?</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight">Tell us your month, budget, and safari style.</h2>
            </div>
            <div className="flex gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#1a1c19] transition-opacity hover:opacity-90">Plan my safari</Link>
              <Link href="/journal" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">Read planning notes</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
