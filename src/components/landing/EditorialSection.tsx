import Link from "next/link";

import { getBlogPosts, getMediaAssets } from "@/lib/mock-data";
import { getFeaturedEditorial } from "@/lib/public-content";

export default async function EditorialSection() {
  const { post, image } = getFeaturedEditorial(await getBlogPosts(), await getMediaAssets());
  if (!post) return null;

  return (
    <section className="overflow-hidden bg-surface-container-low py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12">
        <div className="relative lg:col-span-7">
          <div className="absolute -left-8 -top-8 h-full w-full rounded-xl bg-primary opacity-10" />
          <img className="relative z-10 w-full rounded-xl" alt={post.title} src={image || post.image} />
        </div>
        <div className="lg:col-span-5">
          <span className="mb-6 block text-xs font-bold uppercase tracking-[0.3em] text-primary">Editorial Spotlight</span>
          <div className="mb-6 w-fit rounded-full border border-outline-variant/30 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-on-surface-variant">
            {post.category}
          </div>
          <h2 className="mb-8 font-headline text-5xl font-black leading-none text-on-background">{post.title}</h2>
          <p className="mb-8 text-lg leading-relaxed text-on-surface-variant">{post.excerpt}</p>
          <ul className="mb-10 space-y-4">
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary">check_circle</span><span className="font-bold">Field notes written from live safari planning</span></li>
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary">check_circle</span><span className="font-bold">Operational insight the Nairobi desk uses in real itineraries</span></li>
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary">check_circle</span><span className="font-bold">Updated by admin through the journal workflow</span></li>
          </ul>
          <Link className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary" href={`/journal/${post.slug}`}>
            Read the editorial
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_right_alt</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
