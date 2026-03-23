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
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/components/dashboard/Modal";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <div className="bg-background text-on-background min-h-screen flex selection:bg-primary/10 overflow-x-hidden font-jost">
      {/* SideNavBar Component */}
      <aside 
        className={`hidden lg:flex flex-col p-6 gap-2 bg-surface-container-low h-screen border-r border-outline-variant/10 fixed left-0 top-0 overflow-y-auto z-50 transition-all duration-500 ease-in-out ${
          isCollapsed ? "w-24" : "w-64"
        }`}
      >
        <div className={`mb-10 px-2 flex items-center justify-between transition-all duration-500 ${isCollapsed ? "justify-center" : ""}`}>
          {!isCollapsed && (
            <Link href="/">
              <span className="text-2xl font-black text-primary uppercase tracking-tighter italic">NakTide</span>
            </Link>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 hover:bg-surface-container-high rounded-xl text-on-surface-variant transition-all ${isCollapsed ? "mx-auto" : ""}`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <span className="material-symbols-outlined text-xl">
              {isCollapsed ? "side_navigation_one" : "keyboard_double_arrow_left"}
            </span>
          </button>
        </div>

        <div className={`flex items-center gap-4 px-2 mb-10 pb-6 transition-all ${isCollapsed ? "justify-center" : ""}`}>
          <Avatar className="w-12 h-12 border border-outline-variant/20">
            <AvatarImage src="https://i.pravatar.cc/150?u=julian" alt="Explorer Profile" />
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="min-w-0"
            >
              <p className="font-headline font-bold text-sm text-on-surface truncate">Julian A.</p>
              <p className="text-[10px] uppercase tracking-widest text-primary font-black">
                Gold Member
              </p>
            </motion.div>
          )}
        </div>
        <Separator className="mb-8 opacity-40" />

        <nav className="flex flex-col gap-1.5 overflow-x-hidden">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`group rounded-xl font-headline font-bold text-sm flex items-center gap-4 py-3 transition-all duration-300 ${isCollapsed ? "px-0 justify-center h-12 w-12 mx-auto" : "px-4"} ${
                  isActive
                    ? "bg-primary text-white scale-[1.02]"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
                title={isCollapsed ? link.label : ""}
              >
                <span 
                  className={`material-symbols-outlined text-lg transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-primary/70"}`}
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {link.icon}
                </span>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {link.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className={`mt-8 transition-all duration-500 ${isCollapsed ? "opacity-0 invisible h-0" : "opacity-100"}`}>
           <Button 
             onClick={() => setIsBookingModalOpen(true)}
             className="w-full h-auto bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-headline font-bold text-xs uppercase tracking-widest hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-none border-none"
           >
             <span className="material-symbols-outlined text-sm">add</span>
             Book New Safari
           </Button>
        </div>

        <div className="mt-auto pt-6 flex flex-col gap-4">
          <button 
            className={`w-full bg-surface-container-highest text-on-surface py-3 rounded-xl font-headline font-bold uppercase tracking-widest hover:bg-surface-dim transition-all active:scale-95 border border-outline-variant/10 flex items-center justify-center gap-4 ${isCollapsed ? "px-0 h-12 w-12 mx-auto" : "text-[10px]"}`}
            title={isCollapsed ? "Log Out" : ""}
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            {!isCollapsed && "Log Out"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-500 ease-in-out ${isCollapsed ? "lg:ml-24" : "lg:ml-64"}`}>
        {/* Mobile Header Accent */}
        <header className="lg:hidden flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md border-b border-outline-variant/10 sticky top-0 z-40">
          <Link href="/">
             <span className="text-xl font-black text-primary uppercase tracking-tighter italic">NakTide</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button 
              variant="default"
              size="icon"
              onClick={() => setIsBookingModalOpen(true)}
              className="rounded-xl"
            >
              <span className="material-symbols-outlined text-xl">add</span>
            </Button>
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary rounded-xl"
            >
              <span className="material-symbols-outlined">{isMobileMenuOpen ? "close" : "menu"}</span>
            </Button>
          </div>
        </header>

        {/* Desktop Top Nav / Breadcrumbs */}
        <div className="hidden lg:flex items-center justify-between px-10 py-6">
           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">
             <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
             <span>/</span>
             <span className="text-primary">{navLinks.find(l => l.href === pathname)?.label || "Overview"}</span>
           </div>
           <div className="flex items-center gap-4">
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">notifications</button>
              <div className="h-4 w-px bg-outline-variant/20"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Voyager Journal</span>
           </div>
        </div>

        {/* Content Canvas */}
        <main className="flex-1 p-4 md:p-10 lg:pt-4 overflow-x-hidden">
           <motion.div
             key={pathname}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4, ease: "easeOut" }}
             className="h-full"
           >
             {children}
           </motion.div>
        </main>

        {/* shadcn Dialog for Booking */}
        <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
          <DialogContent className="sm:max-w-2xl bg-surface-container-lowest border border-outline-variant/10 shadow-none font-jost">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black font-headline text-on-background">Plan New Expedition</DialogTitle>
              <DialogDescription className="text-on-surface-variant font-medium text-base">
                 Tell us where you imagine your next adventure.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/5">
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed italic">
                  Where would you like to explore next? Select your destination and preferred timeline.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Destination</label>
                  <select className="flex h-12 w-full items-center justify-between rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-2 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
                    <option>Serengeti, Tanzania</option>
                    <option>Maasai Mara, Kenya</option>
                    <option>Okavango Delta, Botswana</option>
                    <option>Bwindi Forest, Uganda</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Timeline</label>
                  <Input type="date" className="h-12 bg-surface-container-low border-outline-variant/20 rounded-xl font-bold" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Special Requirements</label>
                <Textarea 
                  placeholder="Dietary preferences, photography gear needs, etc."
                  className="bg-surface-container-low border-outline-variant/20 rounded-xl font-medium h-32 resize-none"
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <Button 
                onClick={() => setIsBookingModalOpen(false)}
                className="w-full bg-primary text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-none hover:scale-[1.01] transition-all"
              >
                Initiate Inquiry
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Fullscreen Style Footer */}
        <footer className="footer-accent py-8 px-6 lg:px-12 border-t border-outline-variant/5 bg-surface-container-lowest/30">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40">
              © 2024 NakTide Global • The Savannah Collection
            </p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">
              <a href="#" className="hover:text-primary transition-colors">Safety</a>
              <a href="#" className="hover:text-primary transition-colors">Journal</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-on-background/40 backdrop-blur-sm z-50 pt-20"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white h-full w-4/5 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 text-xl font-headline font-bold p-4 rounded-xl ${
                        pathname === link.href ? "bg-primary text-white" : "text-on-surface"
                      }`}
                    >
                      <span className="material-symbols-outlined">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto pb-8">
                   <button className="w-full bg-surface-container-high py-4 rounded-xl font-bold flex items-center justify-center gap-3">
                     Log Out <span className="material-symbols-outlined">logout</span>
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
