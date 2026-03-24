import Link from "next/link";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Navbar />
      <main className="mx-auto flex-1 max-w-7xl px-6 pb-24 pt-32">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="rounded-[2rem] border-outline-variant/20 bg-[#1a1c19] text-white">
            <CardContent className="p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#f3b38d]">Contact</p>
              <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">Talk to the Nairobi safari desk.</h1>
              <div className="mt-8 space-y-5 text-sm text-white/75">
                <p>Westlands, Nairobi, Kenya</p>
                <p>ops@naktide.com</p>
                <p>+254 700 555 210</p>
                <p>Mon-Sat, 08:00-19:00 EAT</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="mailto:ops@naktide.com" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#1a1c19] transition-opacity hover:opacity-90">Email the desk</Link>
                <Link href="tel:+254700555210" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">Call Nairobi</Link>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-outline-variant/20 bg-white/85">
            <CardHeader>
              <CardTitle>Trip inquiry</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input placeholder="Your name" />
              <Input placeholder="Email address" />
              <Input placeholder="Preferred safari window" />
              <Textarea placeholder="Tell us which parks, travel style, or regional routes you want us to design." />
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-full bg-primary px-5 py-2.5 text-white">Send inquiry</Button>
                <Link href="/journal" className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">Read safari planning notes</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
