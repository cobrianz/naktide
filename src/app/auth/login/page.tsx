"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function normalizeCallback(value: string | null) {
  if (!value || !value.startsWith("/")) return "/dashboard";
  return value;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback = normalizeCallback(searchParams.get("callback"));
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);


  const signupHref = callback === "/dashboard" ? "/auth/signup" : `/auth/signup?callback=${encodeURIComponent(callback)}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const payload = await response.json();
    setPending(false);

    if (!response.ok) {
      const message = payload.error ?? "Login failed";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("Signed in successfully");
    router.push(callback);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f6f1e5_0%,#f0e7d5_55%,#e8dcc6_100%)] text-on-background">
      <main className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden lg:block">
          <img src="https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg" alt="Kenya safari" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,16,14,0.18)_0%,rgba(18,16,14,0.72)_100%)]" />
          <div className="relative flex h-full flex-col justify-between p-10 text-white">
            <Link href="/" className="font-headline text-3xl font-bold italic tracking-tight">NakTide</Link>
            <div className="max-w-xl">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/70">Traveler portal</p>
              <h1 className="mt-4 font-headline text-6xl font-semibold leading-[0.92]">Return to your next Kenya safari.</h1>
              <p className="mt-5 max-w-lg text-base text-white/75">Manage departures, field notes, receipts, and concierge requests from one polished traveler workspace.</p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-12 md:px-8">
          <div className="w-full max-w-lg rounded-[28px] border border-white/60 bg-white/80 p-8 shadow-[0_24px_80px_rgba(26,28,25,0.08)] backdrop-blur xl:p-10">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="font-headline text-3xl font-bold italic tracking-tight lg:hidden">NakTide</Link>
              <Link href="/" className="text-sm font-semibold text-primary">Back to site</Link>
            </div>
            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Sign in</p>
            <h2 className="mt-3 font-headline text-5xl font-semibold tracking-tight">Welcome back.</h2>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">Use your traveler account to review itineraries, payments, departures, and concierge updates.</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2"><label htmlFor="login-id" className="text-sm font-semibold">Email</label><input id="login-id" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="guest@naktide.com" className="h-12 w-full rounded-xl border border-outline-variant/25 bg-[#fbf8f1] px-4 outline-none focus:border-primary" autoComplete="email" /></div>
              <div className="space-y-2"><div className="flex items-center justify-between"><label htmlFor="password" className="text-sm font-semibold">Password</label><Link href="/auth/forgot-password" className="text-xs font-semibold text-primary">Forgot password?</Link></div><div className="relative"><input id="password" value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? "text" : "password"} placeholder="********" className="h-12 w-full rounded-xl border border-outline-variant/25 bg-[#fbf8f1] px-4 pr-12 outline-none focus:border-primary" autoComplete="current-password" /><button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant" onClick={() => setShowPassword((value) => !value)}><span className="material-symbols-outlined text-base">{showPassword ? "visibility_off" : "visibility"}</span></button></div></div>
              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
              <button type="submit" disabled={pending} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white shadow-lg shadow-primary/20 disabled:opacity-70">{pending ? "Signing in..." : "Sign in"} <span className="material-symbols-outlined text-base">arrow_forward</span></button>
            </form>

            <p className="mt-6 text-sm text-on-surface-variant">No account yet? <Link href={signupHref} className="font-semibold text-primary">Create one</Link></p>
          </div>
        </section>
      </main>
    </div>
  );
}
