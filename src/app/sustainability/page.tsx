import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Card, CardContent } from "@/components/ui/card";

const practices = [
  "Smaller departures to reduce vehicle density in fragile wildlife areas.",
  "Local guide and host partnerships centered in Kenya and neighboring destinations.",
  "Route planning that prioritizes conservation levies and lower-friction transit patterns.",
  "Camp and lodge selection biased toward strong community and habitat stewardship records.",
];

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <h1 className="text-5xl font-black tracking-tighter text-on-background md:text-6xl">Sustainability</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-on-surface-variant">
          NakTide is designed around lower-volume, higher-quality safari operations. The goal is not just better aesthetics, but better field behavior.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {practices.map((practice) => (
            <Card key={practice} className="rounded-xl border-outline-variant/20 bg-white/80">
              <CardContent className="p-6 text-sm leading-7 text-on-surface-variant">{practice}</CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
