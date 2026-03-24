import React from "react";
import Navbar from "@/components/landing/Navbar";
import NoticeBanner from "@/components/landing/NoticeBanner";
import Hero from "@/components/landing/Hero";
import Filters from "@/components/landing/Filters";
import AdventureGrid from "@/components/landing/AdventureGrid";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import EditorialSection from "@/components/landing/EditorialSection";
import ServicesSection from "@/components/landing/ServicesSection";
import UpcomingEventsSection from "@/components/landing/UpcomingEventsSection";
import MemoriesGrid from "@/components/landing/MemoriesGrid";
import Footer from "@/components/landing/Footer";
import KenyaPromise from "@/components/landing/KenyaPromise";
import Link from "next/link";
import { getBlogPosts, getCatalogue } from "@/lib/mock-data";

export default async function Home() {
  const [blogPosts, tours] = await Promise.all([getBlogPosts(), getCatalogue()]);
  const pastAdventures = tours.filter((tour) => tour.status === "completed").slice(0, 3);

  return (
    <div className="bg-background text-on-background font-body min-h-screen">
      <Navbar />
      <NoticeBanner />
      <Hero />
      <div className="py-12">
        <Filters />
      </div>
      <ServicesSection />
      <KenyaPromise />
      <FeaturesSection />
      <UpcomingEventsSection />
      <AdventureGrid />
      <section className="bg-[#fffaf2] px-6 py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Past adventures</span>
              <h2 className="mt-4 font-headline text-5xl font-black tracking-tight text-[#23180d]">Archive-led safari stories.</h2>
            </div>
            <Link href="/past-adventures" className="rounded-full border border-[#d8c9b4] px-5 py-3 text-sm font-semibold text-[#23180d] transition-colors hover:bg-white">See archive</Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {pastAdventures.map((tour) => (
              <article key={tour.id} className="overflow-hidden rounded-[1.75rem] border border-[#e4d5bf] bg-white shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
                <img src={tour.image} alt={tour.title} className="h-72 w-full object-cover" />
                <div className="p-7">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9f5f2a]">{tour.location}</p>
                  <h3 className="mt-3 text-2xl font-black text-[#23180d]">{tour.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-[#6d5c48]">{tour.overview}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <MemoriesGrid />
      <TestimonialSection />
      <EditorialSection />
      <section className="bg-[#f7efe0] px-6 py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Journal from the field</span>
              <h2 className="mt-4 font-headline text-5xl font-black tracking-tight text-[#23180d]">Safari planning and dispatch notes.</h2>
            </div>
            <Link href="/journal" className="rounded-full border border-[#d8c9b4] px-5 py-3 text-sm font-semibold text-[#23180d] transition-colors hover:bg-white">
              Read the journal
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.id} className="overflow-hidden rounded-[1.75rem] border border-[#e4d5bf] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
                <img src={post.image} alt={post.title} className="h-72 w-full object-cover" />
                <div className="p-7">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9f5f2a]">{post.category}</p>
                  <h3 className="mt-3 text-2xl font-black text-[#23180d]">{post.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-[#6d5c48]">{post.excerpt}</p>
                  <Link href={`/journal/${post.slug}`} className="mt-6 inline-flex text-sm font-bold uppercase tracking-[0.2em] text-[#9f5f2a]">
                    Open article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
