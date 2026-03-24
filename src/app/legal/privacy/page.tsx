import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <h1 className="text-5xl font-black tracking-tighter text-on-background">Privacy Policy</h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-on-surface-variant">
          <p>NakTide stores traveler inquiry, booking, and preference data only for itinerary planning and service delivery.</p>
          <p>This demo currently uses mock repositories and route handlers. No external booking or payment system is connected yet.</p>
          <p>Before launch, replace this placeholder policy with production legal text aligned to your data stack and compliance requirements.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
