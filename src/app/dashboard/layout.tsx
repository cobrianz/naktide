"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navLinks = [
    { label: "Overview", href: "/dashboard", icon: "dashboard" },
    { label: "Messages", href: "/dashboard/messages", icon: "mail" },
    { label: "Wishlist", href: "/dashboard/wishlist", icon: "favorite" },
    { label: "Bookings", href: "/dashboard/bookings", icon: "confirmation_number" },
    { label: "Settings", href: "/dashboard/settings", icon: "settings" },
  ];

  return (
    <div className="bg-[#fafaf5] text-[#1a1c19] min-h-screen flex selection:bg-primary/20 overflow-x-hidden font-jost relative">
      {/* Background Aesthetic Layers */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Floating Glass Sidebar */}
      <aside 
        className={`hidden lg:flex flex-col p-8 gap-6 bg-white/40 backdrop-blur-2xl h-[calc(100vh-2rem)] border border-white/60 fixed left-4 top-4 rounded-[2.5rem] overflow-y-auto z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] ${
          isCollapsed ? "w-24" : "w-72"
        }`}
      >
        <div className={`mb-12 px-2 flex items-center justify-between transition-all duration-500 ${isCollapsed ? "justify-center" : ""}`}>
          {!isCollapsed && (
            <Link href="/" className="group">
              <span className="text-3xl font-black text-primary uppercase tracking-tighter italic">
                Nak<span className="text-[#5a413a]">Tide</span>
              </span>
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-primary/5 rounded-full"
          >
            <span className="material-symbols-outlined text-xl">
              {isCollapsed ? "side_navigation_one" : "keyboard_double_arrow_left"}
            </span>
          </Button>
        </div>

        {/* User Card */}
        <div className={`flex items-center gap-4 p-4 rounded-3xl bg-white/40 border border-white/60 mb-6 ${isCollapsed ? "justify-center" : ""}`}>
          <Avatar className="w-12 h-12 border-2 border-primary/10">
            <AvatarImage src="https://i.pravatar.cc/150?u=julian" />
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="font-bold text-sm truncate">Julian Vance</p>
              <p className="text-[9px] uppercase tracking-widest text-primary font-bold opacity-60">Elite Voyager</p>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`group relative rounded-2xl font-bold text-sm flex items-center gap-4 py-4 transition-all duration-500 ${isCollapsed ? "px-0 justify-center h-14 w-14 mx-auto" : "px-6"} ${
                  isActive
                    ? "text-primary bg-primary/5 shadow-sm"
                    : "text-[#5a413a]/60 hover:bg-white/60 hover:text-primary"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute left-1 w-1 h-5 bg-primary rounded-full"
                  />
                )}
                <span className={`material-symbols-outlined text-xl ${isActive ? "text-primary" : "opacity-60 group-hover:opacity-100"}`}>
                  {link.icon}
                </span>
                {!isCollapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <Button 
            onClick={() => setIsBookingModalOpen(true)}
            className="w-full bg-primary hover:bg-primary/90 text-white py-8 rounded-[2rem] font-black uppercase tracking-widest text-[9px] shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            {!isCollapsed && "New Expedition"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isCollapsed ? "lg:ml-32" : "lg:ml-84"}`}>
        <header className="px-12 py-10 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
            <Link href="/dashboard" className="hover:text-primary transition-colors">Explorer</Link>
            <span>/</span>
            <span className="text-[#1a1c19] opacity-100">{navLinks.find(l => l.href === pathname)?.label || "Portfolio"}</span>
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="rounded-2xl bg-white/40 border border-white/60 hover:bg-primary/5">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </Button>
            <div className="h-4 w-px bg-[#1a1c19]/10"></div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Operational Status</p>
              <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Systems Nominal</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-12 pb-12 relative z-20 overflow-x-hidden">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-2xl bg-white/90 backdrop-blur-xl border-white/60 rounded-[3rem] shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black italic uppercase italic">Initiate New Inquiry</DialogTitle>
            <DialogDescription className="text-[#5a413a]/60 font-medium">Define the coordinates for your next wilderness encounter.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest opacity-40">Destination</label>
                <select className="w-full bg-[#f4f4ef] border-none rounded-2xl h-12 px-4 text-sm font-bold">
                  <option>Serengeti, Tanzania</option>
                  <option>Okavango, Botswana</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest opacity-40">Departure</label>
                <Input type="date" className="h-12 bg-[#f4f4ef] border-none rounded-2xl" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest opacity-40">Observations & Requirements</label>
              <Textarea className="bg-[#f4f4ef] border-none rounded-2xl h-32 resize-none" placeholder="Photography gear, dietary focus, etc." />
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full bg-primary text-white h-14 rounded-2xl font-black uppercase tracking-widest text-[10px]" onClick={() => setIsBookingModalOpen(false)}>
              Submit Log
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
