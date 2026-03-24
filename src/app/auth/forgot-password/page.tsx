"use client";

import Link from "next/link";
import { useState } from "react";

type ResetStage = "email" | "code" | "password" | "success";

export default function ForgotPasswordPage() {
  const [stage, setStage] = useState<ResetStage>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f6f1e5_0%,#efe4d0_55%,#e3d3bc_100%)] text-on-background">
      <main className="flex min-h-screen items-center justify-center px-5 py-12">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/60 bg-white/75 shadow-[0_24px_80px_rgba(26,28,25,0.08)] backdrop-blur lg:grid-cols-[0.9fr_1.1fr]">
          <section className="relative hidden lg:block">
            <img src="https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg" alt="Safari landscape" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,16,14,0.18)_0%,rgba(18,16,14,0.72)_100%)]" />
            <div className="relative flex h-full flex-col justify-between p-10 text-white">
              <Link href="/" className="font-headline text-3xl font-bold italic tracking-tight">NakTide</Link>
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/70">Account recovery</p>
                <h1 className="mt-4 font-headline text-5xl font-semibold leading-[0.95]">Regain access to your safari workspace.</h1>
              </div>
            </div>
          </section>

          <section className="p-8 lg:p-10">
            <Link href="/" className="font-headline text-3xl font-bold italic tracking-tight lg:hidden">NakTide</Link>
            {stage === "email" ? <><p className="mt-6 text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Reset password</p><h2 className="mt-3 font-headline text-5xl font-semibold tracking-tight">Find your account.</h2><p className="mt-3 text-sm leading-7 text-on-surface-variant">Enter the email used for your NakTide traveler profile.</p><div className="mt-8 grid gap-4"><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="guest@naktide.com" className="h-12 rounded-xl border border-outline-variant/25 bg-[#fbf8f1] px-4 outline-none focus:border-primary" /><button className="h-12 rounded-xl bg-primary text-sm font-semibold text-white" onClick={() => email && setStage("code")}>Send code</button></div></> : null}
            {stage === "code" ? <><p className="mt-6 text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Verification</p><h2 className="mt-3 font-headline text-5xl font-semibold tracking-tight">Enter your code.</h2><p className="mt-3 text-sm leading-7 text-on-surface-variant">A six-digit code was sent to {email}.</p><div className="mt-8 grid gap-4"><input value={code} onChange={(e) => setCode(e.target.value)} placeholder="000000" className="h-12 rounded-xl border border-outline-variant/25 bg-[#fbf8f1] px-4 outline-none focus:border-primary" /><button className="h-12 rounded-xl bg-primary text-sm font-semibold text-white" onClick={() => code.length >= 6 && setStage("password")}>Verify code</button></div></> : null}
            {stage === "password" ? <><p className="mt-6 text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">New password</p><h2 className="mt-3 font-headline text-5xl font-semibold tracking-tight">Create a secure password.</h2><div className="mt-8 grid gap-4"><input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="h-12 rounded-xl border border-outline-variant/25 bg-[#fbf8f1] px-4 outline-none focus:border-primary" /><button className="h-12 rounded-xl bg-primary text-sm font-semibold text-white" onClick={() => password.length >= 8 && setStage("success")}>Reset password</button></div></> : null}
            {stage === "success" ? <div className="mt-6"><p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Complete</p><h2 className="mt-3 font-headline text-5xl font-semibold tracking-tight">Password updated.</h2><p className="mt-3 text-sm leading-7 text-on-surface-variant">Your traveler account is ready again.</p><Link href="/auth/login" className="mt-8 inline-flex h-12 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-white">Back to sign in</Link></div> : null}
            <div className="mt-8"><Link href="/auth/login" className="text-sm font-semibold text-primary">Back to sign in</Link></div>
          </section>
        </div>
      </main>
    </div>
  );
}
