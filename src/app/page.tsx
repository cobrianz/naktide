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

export default function Home() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen">
      <Navbar />
      <NoticeBanner />
      <Hero />
      <div className="py-12">
        <Filters />
      </div>
      <ServicesSection />
      <FeaturesSection />
      <UpcomingEventsSection />
      <AdventureGrid />
      <MemoriesGrid />
      <TestimonialSection />
      <EditorialSection />
      <Footer />
    </div>
  );
}
