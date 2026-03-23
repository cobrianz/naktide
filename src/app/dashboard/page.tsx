"use client";
import React from "react";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateReceipt } from "@/utils/receiptGenerator";

export default function DashboardPage() {
  const handleDownload = (item: any) => {
    const priceValue = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
    
    generateReceipt({
      receiptCode: `RCT-2024-${Math.floor(Math.random() * 9000) + 1000}`,
      dateReceipt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      customer: {
        name: "Julian Alexander Vance",
        email: "j.vance@naktide.com",
        phone: "+1 (555) 012-8843",
        payment: "M-Pesa (FULLY PAID)",
        datetime: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + " EAT"
      },
      items: [
        { desc: item.name, amount: priceValue }
      ],
      totalPaid: priceValue,
      bookingRef: `NKT-SAFARI-${Math.floor(Math.random() * 9000) + 1000}`,
      travelDates: item.date,
      extras: "Elite Voyager Package  •  Private Guide",
      qrLink: "https://naktidetours.com/verify/booking-v1"
    });
  };

  const recentExpeditions = [
    { id: "SV-9821", name: "Serengeti Sunset Trail", date: "Oct 24, 2024", price: "Ksh 161,200", status: "Confirmed", img: "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg" },
    { id: "SV-8742", name: "Ngorongoro Crater Trek", date: "Nov 12, 2024", price: "Ksh 448,500", status: "Pending", img: "https://images.pexels.com/photos/33231637/pexels-photo-33231637.jpeg" },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Immersive Welcome Hero */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <span className="w-12 h-[2px] bg-primary/30"></span>
             <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary/60">Explorer Terminal Access</span>
          </div>
          <h1 className="text-6xl lg:text-9xl font-black text-[#1a1c19] tracking-tighter font-headline leading-[0.85] italic uppercase">
            Jambo,<br />
            <span className="text-primary italic">Julian!</span>
          </h1>
          <p className="text-[#5a413a] font-medium text-lg lg:text-xl max-w-2xl leading-relaxed opacity-70 border-l-2 border-primary/20 pl-8 mt-8">
            Your voyage across the Savannah is being archived with precision. Every coordinate, encounter, and moment is secured within your legacy.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-sm flex flex-col items-center justify-center min-w-[150px]">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2">Expeditions</span>
            <span className="text-4xl font-black font-headline italic">14</span>
          </div>
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-sm flex flex-col items-center justify-center min-w-[150px]">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2">Rewards</span>
            <span className="text-4xl font-black font-headline italic">Elite</span>
          </div>
        </div>
      </section>

      {/* Advanced Bento Terminal */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Points Display - The Gold Reserve */}
        <Card className="xl:col-span-4 bg-primary text-white border-none rounded-[3rem] p-12 overflow-hidden relative group min-h-[450px] flex flex-col shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-all duration-1000 rotate-12">
             <span className="material-symbols-outlined text-[10rem]">stars</span>
          </div>
          <div className="relative z-10">
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest pointer-events-none mb-10">
              Savannah Gold Balance
            </Badge>
            <h2 className="text-7xl lg:text-8xl font-black font-headline tracking-tighter leading-none mb-2">14,250</h2>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Universal Prestige Credits</p>
          </div>
          <div className="mt-auto relative z-10 pt-10 border-t border-white/10">
            <p className="text-sm font-medium opacity-80 leading-relaxed mb-8">
               Your prestige allows you to unlock a <span className="underline underline-offset-4 font-black">Private Nocturnal Photo Safari</span> in the Serengeti. 
            </p>
            <Button className="w-full bg-white text-primary rounded-[2rem] h-16 font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-[1.02] transition-all">
              Redeem Rewards
            </Button>
          </div>
        </Card>

        {/* Action & Stats Cluster */}
        <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-10 flex flex-col justify-between group hover:bg-white/60 transition-all duration-500">
             <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-[1.5rem] bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full bg-[#fafaf5] shadow-sm"><span className="material-symbols-outlined text-sm">north_east</span></Button>
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#5a413a]/40 mb-4">Voyager Progress</p>
               <h3 className="text-4xl font-black italic tracking-tighter text-[#1a1c19]">Serengeti Node Active</h3>
               <p className="text-xs font-bold text-secondary mt-4 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> Finalizing itinerary for October Departure
               </p>
             </div>
          </Card>

          <Card className="bg-[#1a1c19] text-white border-none rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden relative group">
             <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg')] bg-cover bg-center opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000"></div>
             <div className="relative z-10">
               <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center text-primary">
                 <span className="material-symbols-outlined text-2xl">auto_awesome</span>
               </div>
             </div>
             <div className="relative z-10">
               <h3 className="text-3xl font-black italic uppercase leading-tight tracking-tighter mb-4">New Moon<br />Photography</h3>
               <p className="text-white/40 text-sm font-medium mb-8">Exclusive access to nocturnal wildlife sightings this season.</p>
               <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 px-8 font-black uppercase tracking-widest text-[9px] shadow-lg shadow-primary/20">
                 Apply for Permit
               </Button>
             </div>
          </Card>

          {/* Table Container - The Ledger */}
          <Card className="md:col-span-2 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] overflow-hidden shadow-none">
            <div className="px-10 py-8 border-b border-white/60 flex justify-between items-center">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Recent Expedition Logs</h4>
              <Link href="/dashboard/bookings" className="text-[9px] font-black uppercase tracking-widest text-primary hover:underline underline-offset-4">Full Archive</Link>
            </div>
            <Table>
              <TableHeader className="bg-white/20">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="px-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-40">Designation</TableHead>
                  <TableHead className="px-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-40">Timeline</TableHead>
                  <TableHead className="px-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-40 text-right">Manifest</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentExpeditions.map((item, i) => (
                  <TableRow key={i} className="hover:bg-white/40 transition-all border-white/20">
                    <TableCell className="px-10 py-8">
                       <div className="flex items-center gap-5">
                          <Avatar className="w-12 h-12 rounded-[1rem] border border-white/60">
                            <AvatarImage src={item.img} className="object-cover grayscale" />
                            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-bold text-sm truncate">{item.name}</p>
                            <p className="text-[9px] uppercase tracking-widest opacity-40 font-black">{item.id}</p>
                          </div>
                       </div>
                    </TableCell>
                    <TableCell className="px-10 py-8">
                      <span className="text-xs font-bold opacity-60">{item.date}</span>
                    </TableCell>
                    <TableCell className="px-10 py-8 text-right">
                      <Button 
                        onClick={() => handleDownload(item)}
                        variant="ghost" 
                        size="icon" 
                        className="rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm bg-white"
                      >
                        <span className="material-symbols-outlined text-sm">receipt_long</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}
