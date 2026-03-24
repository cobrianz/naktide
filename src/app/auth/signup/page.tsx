"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f6f1e5_0%,#efe4d0_55%,#e3d3bc_100%)] text-on-background">
      <main className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        <section className="flex items-center justify-center px-5 py-12 md:px-8">
          <div className="w-full max-w-xl rounded-[28px] border border-white/60 bg-white/80 p-8 shadow-[0_24px_80px_rgba(26,28,25,0.08)] backdrop-blur xl:p-10">
            <Link href="/" className="font-headline text-3xl font-bold italic tracking-tight">NakTide</Link>
            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Create account</p>
            <h2 className="mt-3 font-headline text-5xl font-semibold tracking-tight">Start your safari profile.</h2>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">Build your traveler record for Kenya departures, multi-country itineraries, and concierge planning.</p>
            <form className="mt-8 grid gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-5 md:grid-cols-2"><div className="space-y-2"><label htmlFor="first-name" className="text-sm font-semibold">First name</label><input id="first-name" className="h-12 w-full rounded-xl border border-outline-variant/25 bg-[#fbf8f1] px-4 outline-none focus:border-primary" /></div><div className="space-y-2"><label htmlFor="last-name" className="text-sm font-semibold">Last name</label><input id="last-name" className="h-12 w-full rounded-xl border border-outline-variant/25 bg-[#fbf8f1] px-4 outline-none focus:border-primary" /></div></div>
              <div className="space-y-2"><label htmlFor="email" className="text-sm font-semibold">Email</label><input id="email" className="h-12 w-full rounded-xl border border-outline-variant/25 bg-[#fbf8f1] px-4 outline-none focus:border-primary" /></div>
              <div className="space-y-2"><label htmlFor="location" className="text-sm font-semibold">Primary location</label><input id="location" placeholder="Nairobi, Kenya" className="h-12 w-full rounded-xl border border-outline-variant/25 bg-[#fbf8f1] px-4 outline-none focus:border-primary" /></div>
              <div className="space-y-2"><label htmlFor="password" className="text-sm font-semibold">Password</label><div className="relative"><input id="password" type={showPassword ? "text" : "password"} className="h-12 w-full rounded-xl border border-outline-variant/25 bg-[#fbf8f1] px-4 pr-12 outline-none focus:border-primary" /><button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant" onClick={() => setShowPassword((value) => !value)}><span className="material-symbols-outlined text-base">{showPassword ? "visibility_off" : "visibility"}</span></button></div></div>
              <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white shadow-lg shadow-primary/20">Create profile <span className="material-symbols-outlined text-base">arrow_forward</span></button>
            </form>
            <p className="mt-6 text-sm text-on-surface-variant">Already have an account? <Link href="/auth/login" className="font-semibold text-primary">Sign in</Link></p>
          </div>
        </section>

        <section className="relative hidden overflow-hidden lg:block">
          <img src="https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Safari terrain" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,16,14,0.18)_0%,rgba(18,16,14,0.74)_100%)]" />
          <div className="relative flex h-full flex-col justify-end p-10 text-white">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/70">Kenya based travel design</p>
            <h1 className="mt-4 max-w-xl font-headline text-6xl font-semibold leading-[0.92]">Join a safari brand built for thoughtful travelers.</h1>
            <p className="mt-5 max-w-lg text-base text-white/75">From Maasai Mara migration timing to Rwanda permit sequencing, your account becomes the anchor for better planning.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
