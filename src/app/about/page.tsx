import Link from "next/link";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pillars = [
  {
    title: "Kenya-grounded operations",
    body: "NakTide coordinates from Nairobi with deep routing knowledge across Maasai Mara, Amboseli, Samburu, Laikipia, and the coast.",
  },
  {
    title: "Small-group safari design",
    body: "Every departure is intentionally paced for photography, conservation respect, and premium guide access rather than mass-tour volume.",
  },
  {
    title: "Regional expedition network",
    body: "Beyond Kenya, we curate Rwanda, Tanzania, Botswana, Namibia, and Uganda journeys through a consistent luxury operating standard.",
  },
];

const values = [
  "Operational clarity before aesthetics",
  "Safari pacing that respects traveler energy",
  "Kenya-first route design with regional reach",
  "Mock-backed systems ready for persistence later",
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Navbar />
      <main className="mx-auto flex-1 max-w-[1500px] px-6 pb-24 pt-32">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Badge className="bg-primary/10 px-4 py-1.5 text-primary">About NakTide</Badge>
            <h1 className="mt-6 text-5xl font-black tracking-tighter text-on-background md:text-7xl">
              Kenya-based safari design with editorial precision.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant">
              We build modern East African safari journeys for travelers who want strong operations, elegant pacing,
              and a more considered wilderness experience.
            </p>
          </div>
          <Card className="rounded-[2rem] border-outline-variant/20 bg-white/80">
            <CardContent className="p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Head office</p>
              <p className="mt-4 text-2xl font-black text-on-background">Nairobi, Kenya</p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                Concierge planning, lodge coordination, overland logistics, permit support, and post-booking traveler care.
              </p>
              <Link href="/contact" className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                Contact the team
              </Link>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="rounded-[1.75rem] border-outline-variant/20 bg-white/80">
              <CardHeader>
                <CardTitle>{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-on-surface-variant">{pillar.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Card className="rounded-[2rem] border-outline-variant/20 bg-[#1a1c19] text-white">
            <CardContent className="p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f3b38d]">What we optimize for</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight">A safari should move well, not just look expensive.</h2>
              <p className="mt-4 text-sm leading-7 text-white/70">We focus on travel flow, guide quality, camp fit, and route integrity so the experience holds together once the trip actually starts.</p>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            {values.map((value) => (
              <div key={value} className="rounded-[1.5rem] border border-outline-variant/20 bg-white/80 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Value</p>
                <p className="mt-4 text-xl font-black tracking-tight text-on-background">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-outline-variant/20 bg-white/80 p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Our model</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-on-background">Built in Kenya, compatible with complex regional itineraries.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-on-surface-variant">That means Maasai Mara and Amboseli can anchor a trip, then extend cleanly into gorilla trekking, delta aviation, or desert circuits without the itinerary losing shape.</p>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/explore" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">Explore routes</Link>
              <Link href="/journal" className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">Read our journal</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
