import React from "react";
import Navbar from "@/components/landing/Navbar";
import NoticeBanner from "@/components/landing/NoticeBanner";
import Hero from "@/components/landing/Hero";
import Filters from "@/components/landing/Filters";
import AdventureGrid from "@/components/landing/AdventureGrid";
import EditorialSection from "@/components/landing/EditorialSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen">
      <Navbar />
      <NoticeBanner />
      <Hero />
      <Filters />
      <AdventureGrid />
      <EditorialSection />
      <Footer />
    </div>
  );
}
