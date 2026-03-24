"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

const items = [
  {
    title: "Nairobi planning desk",
    body: "Kenya-based routing means faster lodge holds, regional flight judgment, and better park sequencing.",
    icon: "globe_asia",
  },
  {
    title: "Photography-led pacing",
    body: "Departure design favors quality sightings, soft-light windows, and less rushed vehicle movement.",
    icon: "photo_camera",
  },
  {
    title: "Private-feel service",
    body: "Even shared departures are composed to feel quiet, polished, and operationally deliberate.",
    icon: "stars",
  },
];

export default function KenyaPromise() {
  return (
    <section className="bg-[#f3ede2] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/65">Why NakTide</p>
          <h2 className="mt-4 text-4xl font-black tracking-tighter text-on-background md:text-5xl">
            A more professional East African safari product.
          </h2>
          <p className="mt-5 text-lg leading-8 text-on-surface-variant">
            Built for travelers who want Kenya depth, premium execution, and a cleaner visual and operational standard than generic tour inventory sites.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <Card className="rounded-xl border-0 bg-white/85 shadow-[0_18px_40px_rgba(26,28,25,0.06)]">
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-black tracking-tight">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-on-surface-variant">{item.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
