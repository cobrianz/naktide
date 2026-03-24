import Link from "next/link";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogPosts } from "@/lib/mock-data";

const sections = [
  {
    title: "Planning windows",
    body: "Seasonality, migration timing, and how to match parks to your travel month without overcomplicating the route.",
  },
  {
    title: "Field operations",
    body: "Guide quality, transfer design, permit handling, and the logistics detail that affects the safari once you are on the ground.",
  },
  {
    title: "Traveler strategy",
    body: "Budget framing, photography priorities, and how to choose between Mara, Amboseli, Laikipia, Samburu, and regional extensions.",
  },
];

export default async function JournalPage() {
  const entries = await getBlogPosts();
  const featured = entries[0];

  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Navbar />
      <main className="mx-auto flex-1 max-w-[1500px] px-6 pb-28 pt-32">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-4xl">
            <Badge className="bg-primary/10 px-4 py-1.5 text-primary">Journal</Badge>
            <h1 className="mt-6 text-6xl font-black tracking-tighter text-on-background md:text-8xl">Field notes from East African safari planning.</h1>
            <p className="mt-6 text-xl leading-9 text-on-surface-variant">Strategy, seasonal timing, route design, and the operational detail that shapes better Kenya and regional safari experiences.</p>
          </div>
          <Card className="rounded-[2rem] border-outline-variant/20 bg-[#1a1c19] text-white">
            <CardContent className="p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f3b38d]">Editorial brief</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">Articles built from what actually changes safari quality.</h2>
              <p className="mt-4 text-sm leading-7 text-white/70">This journal is not filler content. It is where NakTide documents the planning logic behind Kenya and regional safari design.</p>
              <Link href="/contact" className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#1a1c19] transition-opacity hover:opacity-90">Request a planning call</Link>
            </CardContent>
          </Card>
        </div>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <Card key={section.title} className="rounded-[1.75rem] border-outline-variant/20 bg-white/80">
              <CardContent className="p-7">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Coverage</p>
                <h2 className="mt-4 text-2xl font-black tracking-tight">{section.title}</h2>
                <p className="mt-4 text-sm leading-7 text-on-surface-variant">{section.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {featured ? (
          <section className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <img src={featured.image} alt={featured.title} className="h-full min-h-[420px] w-full rounded-[2rem] object-cover" />
            <Card className="rounded-[2rem] border-outline-variant/20 bg-white/80">
              <CardContent className="p-8">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Featured article</p>
                <h2 className="mt-4 text-4xl font-black tracking-tight text-on-background">{featured.title}</h2>
                <p className="mt-5 text-base leading-8 text-on-surface-variant">{featured.excerpt}</p>
                <p className="mt-4 text-sm leading-7 text-on-surface-variant">{featured.body}</p>
                <Link href={`/journal/${featured.slug}`} className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">Read article</Link>
              </CardContent>
            </Card>
          </section>
        ) : null}

        <section className="mt-16 grid gap-8 lg:grid-cols-3">
          {entries.map((entry) => (
            <Card key={entry.slug} className="overflow-hidden rounded-[1.75rem] border-outline-variant/20 bg-white/80">
              <img src={entry.image} alt={entry.title} className="h-64 w-full object-cover" />
              <CardContent className="p-8">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">{entry.category}</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight">{entry.title}</h2>
                <p className="mt-4 text-sm leading-7 text-on-surface-variant">{entry.excerpt}</p>
                <Link href={`/journal/${entry.slug}`} className="mt-6 inline-flex text-sm font-semibold text-primary">Read full article</Link>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
