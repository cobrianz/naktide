import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { Badge } from "@/components/ui/badge";
import { getBlogPosts } from "@/lib/mock-data";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  const related = posts.filter((entry) => entry.slug !== slug).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Navbar />
      <main className="mx-auto flex-1 max-w-[1200px] px-6 pb-24 pt-32">
        <div className="max-w-4xl">
          <Badge className="bg-primary/10 px-4 py-1.5 text-primary">{post.category}</Badge>
          <h1 className="mt-6 text-5xl font-black tracking-tighter text-on-background md:text-7xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-9 text-on-surface-variant">{post.excerpt}</p>
        </div>

        <img src={post.image} alt={post.title} className="mt-12 h-[420px] w-full rounded-[2rem] object-cover" />

        <section className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[2rem] border border-outline-variant/20 bg-white/80 p-8">
            <p className="text-base leading-8 text-on-surface-variant">{post.body}</p>
            <div className="mt-8 space-y-5">
              <div>
                <h2 className="text-2xl font-black text-on-background">What this means for planning</h2>
                <p className="mt-3 text-base leading-8 text-on-surface-variant">NakTide builds around the detail behind this field note: park movement, guide quality, timing windows, and traveler energy across each safari day. That is where strong itineraries separate from generic departures.</p>
              </div>
              <div>
                <h2 className="text-2xl font-black text-on-background">How we use this in the field</h2>
                <p className="mt-3 text-base leading-8 text-on-surface-variant">Our Nairobi team adjusts routing, camp sequencing, and transfer design based on these conditions so the final trip behaves well on the ground, not just in a proposal deck.</p>
              </div>
            </div>
          </article>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-outline-variant/20 bg-white/80 p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Next step</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-on-background">Turn this note into a custom safari brief.</h2>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant">If you want a route built around this topic, our team can convert it into a practical safari plan with dates, camps, and budget framing.</p>
              <Link href="/contact" className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">Talk to the Nairobi desk</Link>
            </div>
            <div className="rounded-[2rem] border border-outline-variant/20 bg-white/80 p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Related reads</p>
              <div className="mt-5 space-y-5">
                {related.map((entry) => (
                  <Link key={entry.id} href={`/journal/${entry.slug}`} className="block rounded-xl border border-outline-variant/20 bg-[#faf6ed] p-4 transition-colors hover:border-primary/30">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-primary/60">{entry.category}</p>
                    <h3 className="mt-2 text-lg font-black text-on-background">{entry.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">{entry.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
