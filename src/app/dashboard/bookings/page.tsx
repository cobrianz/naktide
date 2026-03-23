"use client";
import React, { useState } from "react";
import { generateReceipt } from "@/utils/receiptGenerator";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  
  const bookings = [
    {
      bookingId: "SV-9821",
      name: "Serengeti Sunset Trail",
      location: "Tanzania, East Africa",
      date: "Oct 24 - Oct 29, 2024",
      attendees: "2 Explorers",
      price: "Ksh 161,200",
      status: "CONFIRMED",
      img: "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg",
      customerName: "Julian Alexander Vance"
    },
    {
      bookingId: "SV-8742",
      name: "Ngorongoro Crater Trek",
      location: "Tanzania, East Africa",
      date: "Nov 12 - Nov 15, 2024",
      attendees: "4 Explorers",
      price: "Ksh 448,500",
      status: "PENDING",
      img: "https://images.pexels.com/photos/33231637/pexels-photo-33231637.jpeg",
      customerName: "Julian Alexander Vance"
    },
    {
        bookingId: "SV-4122",
        name: "Mount Kilimanjaro Summit",
        location: "Tanzania, East Africa",
        date: "May 10 - May 20, 2024",
        attendees: "2 Explorers",
        price: "Ksh 676,000",
        status: "CANCELLED",
        img: "https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg",
        customerName: "Julian Alexander Vance"
      },
  ];

  const handleDownload = (booking: any) => {
    const priceValue = parseInt(booking.price.replace(/[^0-9]/g, "")) || 0;
    
    generateReceipt({
      receiptCode: `RCT-2024-${booking.bookingId.split('-')[1]}`,
      dateReceipt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      customer: {
        name: booking.customerName || "Julian Alexander Vance",
        email: "j.vance@naktide.com",
        phone: "+1 (555) 012-8843",
        payment: "M-Pesa (FULLY PAID)",
        datetime: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + " EAT"
      },
      items: [
        { desc: booking.name, amount: priceValue }
      ],
      totalPaid: priceValue,
      bookingRef: `NKT-${booking.bookingId}`,
      travelDates: booking.date,
      extras: booking.attendees + "  •  " + booking.location,
      qrLink: `https://naktidetours.com/verify/${booking.bookingId}`
    });
  };

  return (
    <div className="flex flex-col gap-12 pb-20">
      <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <span className="w-8 h-px bg-primary/40"></span>
             <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary/60">Operation Archive</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-[#1a1c19] tracking-tighter font-headline leading-tight italic uppercase">
            Travel<br />
            <span className="text-primary italic">Manifests</span>
          </h1>
          <p className="text-[#5a413a] font-medium text-lg lg:text-xl max-w-2xl opacity-70 border-l-2 border-primary/20 pl-8 mt-6 leading-relaxed">
            A comprehensive record of your past, current, and upcoming wilderness coordinates.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/40 backdrop-blur-xl border border-white/60 p-2 rounded-2xl shadow-sm">
          <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-[0.2em] focus:ring-0 cursor-pointer px-4 py-2 outline-none appearance-none">
            <option>All Operations</option>
            <option>Confirmed</option>
            <option>Pending</option>
          </select>
          <span className="material-symbols-outlined text-sm pr-4 opacity-40">expand_more</span>
        </div>
      </header>

      <div className="space-y-12">
        {/* Featured Expedition Portfolio */}
        <Card className="bg-white/40 backdrop-blur-2xl rounded-[3rem] overflow-hidden flex flex-col xl:flex-row group border-white/60 shadow-xl shadow-on-background/5 border-2 min-h-[500px]">
          <div className="xl:w-2/5 relative overflow-hidden min-h-[350px]">
            <img 
              alt="Safari scene" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
              src={bookings[0].img} 
            />
            <div className="absolute top-10 left-10">
              <Badge className="bg-[#1a1c19] text-white px-6 py-2 rounded-full text-[9px] font-black tracking-[0.3em] uppercase border-none pointer-events-none shadow-xl">
                {bookings[0].status}
              </Badge>
            </div>
          </div>
          <CardContent className="xl:w-3/5 p-12 lg:p-16 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-4xl lg:text-5xl font-black mb-4 font-headline italic leading-[0.9] text-[#1a1c19] uppercase tracking-tighter">{bookings[0].name}</h3>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#5a413a]/40 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">location_on</span> {bookings[0].location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-4xl font-black text-primary tracking-tighter">{bookings[0].price}</span>
                  <p className="text-[9px] text-[#5a413a] uppercase tracking-[0.3em] font-black opacity-30 mt-2">Full Financial Settlement</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-12 py-12 border-t border-[#1a1c19]/5">
                <div>
                  <span className="block text-[9px] text-[#5a413a] uppercase tracking-[0.3em] font-black mb-4 opacity-40">Operational Window</span>
                  <p className="font-headline font-black text-xl text-[#1a1c19] tracking-tighter italic uppercase">{bookings[0].date}</p>
                </div>
                <div>
                  <span className="block text-[9px] text-[#5a413a] uppercase tracking-[0.3em] font-black mb-4 opacity-40">Personnel Unit</span>
                  <p className="font-headline font-black text-xl text-[#1a1c19] tracking-tighter italic uppercase">{bookings[0].attendees}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => handleDownload(bookings[0])}
                className="flex-1 bg-white hover:bg-white/80 text-primary border border-primary/10 rounded-2xl h-16 font-black uppercase tracking-[0.2em] text-[10px] shadow-sm transition-all flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-lg">receipt_long</span>
                Generate Manifest
              </Button>
              <Button className="flex-1 bg-[#1a1c19] text-white hover:bg-[#1a1c19]/90 rounded-2xl h-16 font-black uppercase tracking-[0.2em] text-[10px] shadow-xl transition-all">
                Modify Coordinates
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* The Archive Table */}
        <Card className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] overflow-hidden shadow-none border-2">
          <Table>
            <TableHeader className="bg-white/30">
              <TableRow className="hover:bg-transparent border-b border-white/60">
                <TableHead className="px-12 py-8 text-[10px] font-black tracking-[0.3em] uppercase opacity-40">Destination</TableHead>
                <TableHead className="px-12 py-8 text-[10px] font-black tracking-[0.3em] uppercase opacity-40">Financials</TableHead>
                <TableHead className="px-12 py-8 text-[10px] font-black tracking-[0.3em] uppercase opacity-40">Status</TableHead>
                <TableHead className="px-12 py-8 text-[10px] font-black tracking-[0.3em] uppercase opacity-40 text-right">Access</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-[#1a1c19]/5">
              {bookings.map((item, idx) => (
                <TableRow key={idx} className={`hover:bg-white/60 transition-all group ${item.status === 'CANCELLED' ? 'opacity-40 grayscale' : ''}`}>
                  <TableCell className="px-12 py-10">
                    <div className="flex items-center gap-6">
                      <Avatar className="w-16 h-16 rounded-[1.5rem] border border-white/60 shadow-sm transition-all group-hover:rotate-3">
                        <AvatarImage src={item.img} alt={item.name} className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-headline font-black text-xl text-[#1a1c19] truncate italic tracking-tighter uppercase leading-none">{item.name}</p>
                        <p className="text-[10px] text-[#5a413a] uppercase tracking-widest font-black opacity-30 mt-2">{item.date}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-12 py-10 text-lg font-black text-primary tracking-tighter">{item.price}</TableCell>
                  <TableCell className="px-12 py-10">
                    <Badge variant="outline" className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border-none shadow-none ${
                        item.status === 'CONFIRMED' ? 'bg-secondary text-white' : 
                        item.status === 'PENDING' ? 'bg-[#eeeee9] text-[#5a413a]' : 
                        'bg-error text-white'
                      }`}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-12 py-10 text-right">
                    <div className="flex justify-end gap-3">
                      <Button 
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(item)}
                        className="w-12 h-12 rounded-xl border border-white/60 bg-white/40 hover:bg-primary hover:text-white transition-all shadow-sm"
                        title="Download Manifest"
                      >
                        <span className="material-symbols-outlined text-sm">receipt_long</span>
                      </Button>
                      <Button 
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedBooking(item)}
                        className="w-12 h-12 rounded-xl border border-white/60 bg-white/40 hover:bg-[#1a1c19] hover:text-white transition-all shadow-sm"
                      >
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Portfolio Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="sm:max-w-2xl bg-white/90 backdrop-blur-2xl border-white/60 rounded-[3rem] shadow-2xl p-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black italic uppercase italic tracking-tighter">Mission Folder</DialogTitle>
            <DialogDescription className="text-[#5a413a]/60 font-medium">Detailed intelligence for your Savannah operations.</DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-10 py-8">
              <div className="flex items-center gap-10">
                 <Avatar className="w-24 h-24 rounded-[2rem] border-2 border-primary/20 shadow-xl overflow-hidden">
                   <AvatarImage src={selectedBooking.img} className="object-cover" />
                   <AvatarFallback>{selectedBooking.name.charAt(0)}</AvatarFallback>
                 </Avatar>
                 <div>
                   <h3 className="text-3xl font-black italic text-[#1a1c19] tracking-tighter uppercase leading-none mb-3">{selectedBooking.name}</h3>
                   <div className="flex items-center gap-3">
                     <Badge variant="outline" className="px-4 py-1 text-[9px] font-black uppercase tracking-widest bg-primary/5 text-primary border-none">{selectedBooking.bookingId}</Badge>
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-30">{selectedBooking.location}</p>
                   </div>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-12 py-10 border-y border-[#1a1c19]/5">
                 <div className="space-y-3">
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Status Level</p>
                   <p className="text-sm font-black text-[#1a1c19]">{selectedBooking.status}</p>
                 </div>
                 <div className="space-y-3">
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Settlement</p>
                   <p className="text-sm font-black text-primary">{selectedBooking.price}</p>
                 </div>
                 <div className="space-y-3">
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Chronology</p>
                   <p className="text-sm font-black text-[#1a1c19]">{selectedBooking.date}</p>
                 </div>
                 <div className="space-y-3">
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Voyager Unit</p>
                   <p className="text-sm font-black text-[#1a1c19]">{selectedBooking.attendees}</p>
                 </div>
              </div>

              <div className="p-8 bg-surface-container-low/20 rounded-[2rem] border border-white/60 italic text-sm font-medium text-[#5a413a] leading-relaxed">
                 &quot;Your itinerary is finalized. Prepare for private guided nocturnal photography, elite camp access, and tailored wilderness encounters.&quot;
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              onClick={() => handleDownload(selectedBooking)}
              className="w-full bg-[#1a1c19] text-white h-16 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-[1.01] transition-all"
            >
              Export Full Manifest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
