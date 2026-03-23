"use client";
import React, { useState } from "react";
import Link from "next/link";

type ResetStage = "email" | "code" | "password" | "success";

export default function ForgotPasswordPage() {
  const [stage, setStage] = useState<ResetStage>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStage("code");
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) setStage("password");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length >= 8) setStage("success");
  };

  return (
    <div className="bg-background font-body text-on-background min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Artistic Asymmetric Background Element */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-fixed-dim/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-fixed/20 rounded-full blur-3xl"></div>

        <div className="w-full max-w-lg z-10">
          {/* Brand Anchor */}
          <div className="mb-12 text-center lg:text-left">
            <Link href="/">
              <h2 className="font-headline text-3xl font-black tracking-tighter text-on-background mb-2 uppercase italic">
                NakTide
              </h2>
            </Link>
            <div className="h-1 w-12 bg-primary rounded-full mx-auto lg:mx-0"></div>
          </div>

          {/* Card Container */}
          <div className="bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-[0_12px_40px_rgba(90,65,58,0.06)] border border-outline-variant/10">
            {stage === "email" && (
              <div id="email-stage">
                <header className="mb-10">
                  <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-background mb-4 leading-tight">
                    Lost your <span className="text-primary">way?</span>
                  </h1>
                  <p className="text-on-surface-variant font-medium leading-relaxed">
                    It happens to the best explorers. Enter your email and we'll send a compass link to get you back on
                    track.
                  </p>
                </header>
                <form className="space-y-8" onSubmit={handleEmailSubmit}>
                  <div className="group">
                    <label
                      className="block font-label text-xs uppercase tracking-[0.1rem] font-bold text-on-surface-variant mb-3 group-focus-within:text-primary transition-colors"
                      htmlFor="email"
                    >
                      Explorer Email
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 py-4 px-0 focus:ring-0 focus:border-primary placeholder:text-on-surface-variant/40 text-on-surface font-medium transition-all outline-none"
                        id="email"
                        name="email"
                        placeholder="alex@voyage.com"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant/30">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      className="bg-gradient-to-r from-primary to-primary-container w-full py-4 px-8 text-white font-headline font-bold text-lg rounded-lg shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                      type="submit"
                    >
                      Send Reset Link
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {stage === "code" && (
              <div id="code-stage">
                <header className="mb-10">
                  <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-background mb-4 leading-tight">
                    Verify <span className="text-primary">Signal.</span>
                  </h1>
                  <p className="text-on-surface-variant font-medium leading-relaxed">
                    We've sent a 6-digit verification code to <span className="font-bold text-on-background">{email}</span>.
                  </p>
                </header>
                <form className="space-y-8" onSubmit={handleCodeSubmit}>
                  <div className="group">
                    <label
                      className="block font-label text-xs uppercase tracking-[0.1rem] font-bold text-on-surface-variant mb-3 group-focus-within:text-primary transition-colors"
                      htmlFor="code"
                    >
                      Verification Code
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 py-4 px-0 focus:ring-0 focus:border-primary placeholder:text-on-surface-variant/40 text-on-surface font-black text-2xl tracking-[1em] transition-all outline-none"
                        id="code"
                        name="code"
                        placeholder="000000"
                        maxLength={6}
                        type="text"
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      className="bg-gradient-to-r from-primary to-primary-container w-full py-4 px-8 text-white font-headline font-bold text-lg rounded-lg shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                      type="submit"
                    >
                      Verify Code
                      <span className="material-symbols-outlined text-xl">vpn_key</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStage("email")}
                      className="w-full mt-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 hover:text-primary transition-colors"
                    >
                      Edit Email
                    </button>
                  </div>
                </form>
              </div>
            )}

            {stage === "password" && (
              <div id="password-stage">
                <header className="mb-10">
                  <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-background mb-4 leading-tight">
                    Secure your <span className="text-primary">profile.</span>
                  </h1>
                  <p className="text-on-surface-variant font-medium leading-relaxed">
                    Set a new strong password to regain access to your NakTide account.
                  </p>
                </header>
                <form className="space-y-8" onSubmit={handlePasswordSubmit}>
                  <div className="group">
                    <label
                      className="block font-label text-xs uppercase tracking-[0.1rem] font-bold text-on-surface-variant mb-3 group-focus-within:text-primary transition-colors"
                      htmlFor="password"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 py-4 px-0 focus:ring-0 focus:border-primary placeholder:text-on-surface-variant/40 text-on-surface font-medium transition-all outline-none"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      className="bg-gradient-to-r from-primary to-primary-container w-full py-4 px-8 text-white font-headline font-bold text-lg rounded-lg shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                      type="submit"
                    >
                      Reset Password
                      <span className="material-symbols-outlined text-xl">lock_reset</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {stage === "success" && (
              <div className="text-center py-6" id="success-state">
                <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center mx-auto mb-8">
                  <span
                    className="material-symbols-outlined text-4xl text-on-secondary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
                <h2 className="font-headline text-3xl font-extrabold text-on-background mb-4">Signal Restored</h2>
                <p className="text-on-surface-variant leading-relaxed mb-8 max-w-sm mx-auto">
                  Your password has been successfully reset. You can now sign in to your dashboard.
                </p>
                <Link
                  href="/auth/login"
                  className="block w-full bg-primary py-4 px-8 text-white font-headline font-bold rounded-lg hover:opacity-90 transition-all shadow-lg active:scale-95"
                >
                  Back to Sign In
                </Link>
              </div>
            )}

            {stage !== "success" && (
              <footer className="mt-12 pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  className="text-secondary font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
                  href="/auth/login"
                >
                  <span className="material-symbols-outlined text-lg">arrow_back</span>
                  <span className="font-label text-sm uppercase tracking-wider">Back to Login</span>
                </Link>
                <span className="text-on-surface-variant/50 text-xs font-medium italic">Support: +1 800 SAFARI</span>
              </footer>
            )}
          </div>
          {/* Footer Meta */}
          <p className="mt-12 text-center text-on-surface-variant/40 font-label text-[10px] uppercase tracking-[0.2rem]">
            © 2024 NakTide Global • Savannah Meridian System
          </p>
        </div>
      </main>

      {/* Ambient Visual Decoration (Editorial Explorer Style) */}
      <aside className="hidden xl:block fixed right-0 top-0 h-screen w-1/4 pointer-events-none">
        <div className="h-full w-full bg-surface-container-low/30 flex items-center justify-center p-12">
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden grayscale contrast-125 opacity-10">
            <img
              alt="Safari Terrain"
              className="w-full h-full object-cover"
              src="https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg"
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
