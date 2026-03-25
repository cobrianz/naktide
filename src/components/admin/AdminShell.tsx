"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";

import { LogoutButton } from "@/components/auth/LogoutButton";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Overview", href: "/admin", icon: "space_dashboard" },
  { label: "Analytics", href: "/admin/analytics", icon: "monitoring" },
  { label: "Billing", href: "/admin/billing", icon: "credit_card" },
  { label: "Bookings", href: "/admin/bookings", icon: "calendar_month" },
  { label: "Customers", href: "/admin/customers", icon: "groups" },
  { label: "Content", href: "/admin/content", icon: "campaign" },
  { label: "Inventory", href: "/admin/inventory", icon: "inventory_2" },
  { label: "Settings", href: "/admin/settings", icon: "tune" },
];

function Sidebar({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <aside className="flex h-full w-[86vw] max-w-[320px] flex-col border-r border-[#1a1c19]/8 bg-[#f7f1e5]/96 p-5 backdrop-blur lg:w-72">
      <div className="flex items-center justify-between border-b border-[#1a1c19]/8 pb-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Operations desk</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-on-background">NakTide Control</h2>
          <p className="mt-2 text-sm text-on-surface-variant">Safari operations for departures, billing, guest care, content, and inventory management.</p>
        </div>
        {onClose ? (
          <Button variant="ghost" size="icon" className="rounded-xl text-on-background lg:hidden" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </Button>
        ) : null}
      </div>

      <nav className="mt-6 space-y-2 overflow-y-auto pr-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active ? "bg-primary text-white" : "text-[#4d463d] hover:bg-white hover:text-on-background"
              }`}
            >
              <span className="material-symbols-outlined text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl bg-white p-5 text-on-background shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Mode</p>
        <p className="mt-2 text-2xl font-black">Live safari desk</p>
        <p className="mt-2 text-sm font-medium text-on-surface-variant">Use this console to coordinate departures, guest communications, payments, and field inventory.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/" className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#1a1c19]/10 px-4 py-2 text-sm font-semibold transition hover:bg-[#f8f0e3]">
            Public site
          </Link>
          <LogoutButton className="flex-1 justify-center rounded-xl" />
        </div>
      </div>
    </aside>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_rgba(173,44,0,0.10),_transparent_20%),linear-gradient(180deg,#faf6ed_0%,#f1e7d7_100%)] text-on-background">
      <div className="flex min-h-screen w-full">
        <div className="hidden lg:block">
          <Sidebar pathname={pathname} />
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <>
              <motion.button
                type="button"
                className="fixed inset-0 z-40 bg-black/35 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                className="fixed inset-y-0 left-0 z-50 lg:hidden"
                initial={{ x: -340 }}
                animate={{ x: 0 }}
                exit={{ x: -340 }}
                transition={{ type: "spring", stiffness: 250, damping: 30 }}
              >
                <Sidebar pathname={pathname} onClose={() => setMobileOpen(false)} />
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-[#1a1c19]/8 bg-[#faf6ed]/84 px-4 py-4 backdrop-blur md:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="rounded-xl border-[#1a1c19]/10 bg-white text-on-background lg:hidden" onClick={() => setMobileOpen(true)}>
                  <span className="material-symbols-outlined">menu</span>
                </Button>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Operations control</p>
                  <h1 className="mt-1 text-2xl font-black tracking-tight lg:text-3xl">Admin dashboard</h1>
                </div>
              </div>
              <div className="hidden flex-wrap gap-3 md:flex">
                <Link href="/" className="rounded-full border border-[#1a1c19]/10 bg-white px-4 py-2 text-sm font-semibold text-on-background">
                  Public site
                </Link>
                <LogoutButton className="rounded-full border border-[#1a1c19]/10 bg-white px-4 py-2 text-sm font-semibold text-on-background" />
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-x-auto px-4 py-6 md:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
