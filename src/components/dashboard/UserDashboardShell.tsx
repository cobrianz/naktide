"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useState } from "react";

import type { UserProfile } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Overview", href: "/dashboard", icon: "dashboard" },
  { label: "Messages", href: "/dashboard/messages", icon: "mail" },
  { label: "Wishlist", href: "/dashboard/wishlist", icon: "favorite" },
  { label: "Bookings", href: "/dashboard/bookings", icon: "confirmation_number" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
];

function Sidebar({
  pathname,
  profile,
  collapsed,
  onCollapse,
  onNavigate,
  mobile = false,
}: {
  pathname: string;
  profile: UserProfile;
  collapsed: boolean;
  onCollapse: () => void;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  return (
    <aside
      className={`flex h-full flex-col border-r border-[#1a1c19]/8 bg-[#f8f4ec]/92 backdrop-blur ${
        mobile ? "w-[86vw] max-w-[320px] p-5" : collapsed ? "w-24 p-4" : "w-72 p-5"
      }`}
    >
      <div className={`mb-8 flex items-center ${collapsed && !mobile ? "justify-center" : "justify-between"}`}>
        {(!collapsed || mobile) && (
          <Link href="/" className="text-3xl font-black uppercase italic tracking-tight text-primary" onClick={onNavigate}>
            Nak<span className="text-[#5a413a]">Tide</span>
          </Link>
        )}
        <Button variant="ghost" size="icon" className="rounded-full" onClick={onCollapse}>
          <span className="material-symbols-outlined text-xl">
            {mobile ? "close" : collapsed ? "keyboard_double_arrow_right" : "keyboard_double_arrow_left"}
          </span>
        </Button>
      </div>

      <div className={`mb-6 flex items-center gap-4 rounded-2xl bg-white/80 p-4 ${collapsed && !mobile ? "justify-center" : ""}`}>
        <Avatar className="h-12 w-12 border border-primary/10">
          <AvatarImage src={profile.avatar} alt={profile.name} />
          <AvatarFallback>{profile.firstName.slice(0, 1)}</AvatarFallback>
        </Avatar>
        {(!collapsed || mobile) && (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{profile.name}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/70">{profile.tier}</p>
          </div>
        )}
      </div>

      <nav className="space-y-2">
        {navLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                collapsed && !mobile ? "justify-center" : ""
              } ${active ? "bg-primary text-white shadow-sm" : "text-[#4d463d] hover:bg-white hover:text-[#1a1c19]"}`}
            >
              <span className="material-symbols-outlined text-lg">{link.icon}</span>
              {(!collapsed || mobile) && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl bg-[#1a1c19] p-5 text-white">
        {(!collapsed || mobile) ? (
          <>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Kenya operations</p>
            <p className="mt-3 text-xl font-black italic">Nairobi concierge active</p>
            <p className="mt-3 text-sm text-white/70">
              Your traveler workspace is ready for Maasai Mara, Amboseli, Samburu, and regional departures.
            </p>
            <Link
              href="/explore"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#1a1c19] transition hover:bg-white/90"
            >
              Explore safaris
            </Link>
          </>
        ) : (
          <div className="flex justify-center">
            <span className="material-symbols-outlined">travel</span>
          </div>
        )}
      </div>
    </aside>
  );
}

export function UserDashboardShell({
  children,
  profile,
}: {
  children: ReactNode;
  profile: UserProfile;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(173,44,0,0.08),_transparent_24%),linear-gradient(180deg,#f6f3ea_0%,#efe9dc_100%)] text-on-background">
      <div className="flex min-h-screen w-full">
        <div className="hidden lg:block">
          <Sidebar
            pathname={pathname}
            profile={profile}
            collapsed={collapsed}
            onCollapse={() => setCollapsed((value) => !value)}
          />
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.button
                type="button"
                className="fixed inset-0 z-40 bg-black/45 lg:hidden"
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
                transition={{ type: "spring", stiffness: 240, damping: 26 }}
              >
                <Sidebar
                  pathname={pathname}
                  profile={profile}
                  collapsed={false}
                  mobile
                  onCollapse={() => setMobileOpen(false)}
                  onNavigate={() => setMobileOpen(false)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-[#1a1c19]/6 bg-[#f8f4ec]/82 px-4 py-4 backdrop-blur md:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="rounded-xl lg:hidden" onClick={() => setMobileOpen(true)}>
                  <span className="material-symbols-outlined">menu</span>
                </Button>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Traveler workspace</p>
                  <h1 className="mt-1 text-2xl font-black italic tracking-tight text-[#1a1c19] md:text-3xl">
                    {profile.firstName}&apos;s dashboard
                  </h1>
                </div>
              </div>
              <div className="hidden flex-wrap items-center gap-3 md:flex">
                <Link href="/explore" className="inline-flex items-center rounded-full border border-[#1a1c19]/10 bg-white px-4 py-2 text-sm font-semibold">
                  Browse safaris
                </Link>
                <Link
                  href="/"
                  className="rounded-full border border-[#1a1c19]/10 bg-white px-4 py-2 text-sm font-semibold text-[#1a1c19] transition hover:bg-white/90"
                >
                  Public site
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
