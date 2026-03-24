import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <h1 className="text-5xl font-black tracking-tighter text-on-background">Terms of Service</h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-on-surface-variant">
          <p>Bookings are subject to itinerary availability, conservation access, supplier confirmation, and traveler document readiness.</p>
          <p>Mock data currently powers this project, but the route structure is already set up for live booking and traveler account integration.</p>
          <p>For commercial deployment, final legal terms should be reviewed and replaced with production copy.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
