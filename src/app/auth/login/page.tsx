"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-background font-body text-on-background antialiased selection:bg-primary/20 min-h-screen">
      <main className="min-h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Editorial Image Section */}
        <section className="relative w-full md:w-[55%] h-64 md:h-auto overflow-hidden">
          <div className="absolute inset-0 bg-on-background/20 z-10"></div>
          <img
            alt="Scenic savannah landscape at sunset"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg"
          />
          <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20 text-white max-w-2xl">
            <p className="font-label text-xs uppercase tracking-[0.2rem] mb-4 opacity-80">The Digital Expedition</p>
            <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-6">
              Journey into the <br /> Heart of the Wild.
            </h1>
            <div className="h-1 w-12 bg-primary"></div>
          </div>
          {/* Brand Anchor in Image */}
          <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
            <Link href="/" className="font-headline text-2xl font-bold tracking-tighter text-white uppercase italic">
              NakTide
            </Link>
          </div>
        </section>

        {/* Right Side: Login Form Section */}
        <section className="w-full md:w-[45%] bg-surface flex items-center justify-center p-6 md:p-20">
          <div className="w-full max-w-md">
            <header className="mb-12">
              <h2 className="font-headline text-3xl font-extrabold text-on-background mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant font-medium">Please enter your credentials to access your journal.</p>
            </header>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              {/* Input: Email/Username */}
              <div className="space-y-2">
                <label className="font-label text-[10px] uppercase tracking-[0.15rem] font-bold text-on-surface-variant" htmlFor="login-id">
                  Email or Username
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 py-4 px-0 focus:ring-0 focus:border-primary transition-all placeholder:text-on-surface-variant/40 outline-none"
                    id="login-id"
                    name="login-id"
                    placeholder="alex@explorer.com"
                    type="text"
                  />
                </div>
              </div>
              {/* Input: Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="font-label text-[10px] uppercase tracking-[0.15rem] font-bold text-on-surface-variant" htmlFor="password">
                    Password
                  </label>
                  <Link className="text-xs font-semibold text-primary hover:text-primary-container transition-colors" href="/auth/forgot-password">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    className="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 py-4 px-0 focus:ring-0 focus:border-primary transition-all placeholder:text-on-surface-variant/40 outline-none"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant/40"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>
              {/* Action: Login Button */}
              <button
                className="w-full bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold py-4 rounded-md shadow-[0_12px_40px_rgba(173,44,0,0.15)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
                type="submit"
              >
                Sign In
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
              {/* Divider */}
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-surface-container-highest"></div>
                <span className="flex-shrink mx-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50">
                  or continue with
                </span>
                <div className="flex-grow border-t border-surface-container-highest"></div>
              </div>
              {/* Social Login */}
              <div className="grid grid-cols-1 gap-4">
                <button
                  className="flex items-center justify-center gap-3 w-full py-4 border-2 border-outline-variant/20 rounded-md bg-surface-container-lowest hover:bg-surface-container-high transition-colors text-on-background font-semibold"
                  type="button"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </form>
            <footer className="mt-12 text-center">
              <p className="text-on-surface-variant font-medium">
                Don't have an account?
                <Link className="text-secondary font-bold hover:underline underline-offset-4 ml-1" href="/auth/signup">
                  Sign up
                </Link>
              </p>
            </footer>
          </div>
        </section>
      </main>
      {/* Branding Element: The Compass (Visual Accent Only) */}
      <div className="fixed bottom-8 right-8 hidden lg:block pointer-events-none opacity-10">
        <span className="material-symbols-outlined text-9xl text-on-surface">explore</span>
      </div>
    </div>
  );
}
