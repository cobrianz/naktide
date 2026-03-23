"use client";
import React from "react";
import { generateReceipt } from "@/utils/receiptGenerator";
import Modal from "@/components/dashboard/Modal";

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = React.useState<any>(null);
  
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
    generateReceipt({
      bookingId: booking.bookingId,
      customerName: booking.customerName,
      adventureName: booking.name,
      date: booking.date,
      attendees: booking.attendees,
      price: booking.price,
      status: booking.status
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-on-surface tracking-tight font-headline">My Bookings</h1>
          <p className="text-on-surface-variant font-medium mt-2 text-lg lg:text-xl">Manage your expeditions across the Savannah.</p>
        </div>
        <div className="flex items-center gap-4 bg-surface-container-low p-2 rounded-2xl border border-outline-variant/10">
          <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest focus:ring-0 cursor-pointer px-4">
            <option>All Statuses</option>
            <option>Confirmed</option>
            <option>Pending</option>
          </select>
        </div>
      </header>

      <div className="space-y-8">
        {/* Featured Booking */}
        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden flex flex-col md:flex-row group border border-outline-variant/5">
          <div className="md:w-2/5 relative overflow-hidden min-h-[300px]">
            <img 
              alt="Safari scene" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              src={bookings[0].img} 
            />
            <div className="absolute top-6 left-6 bg-secondary text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg">
              {bookings[0].status}
            </div>
          </div>
          <div className="md:w-3/5 p-8 lg:p-12 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-black mb-1 group-hover:text-primary transition-colors">{bookings[0].name}</h3>
                <p className="text-on-surface-variant text-sm font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">location_on</span> {bookings[0].location}
                </p>
              </div>
              <div className="text-right">
                <span className="block text-3xl font-black text-primary">{bookings[0].price}</span>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-black opacity-40">Payment Verified</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-10 pt-6 border-t border-outline-variant/5">
              <div>
                <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest font-black mb-2 opacity-50">Departure & Return</span>
                <p className="font-headline font-bold text-base text-on-surface">{bookings[0].date}</p>
              </div>
              <div>
                <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest font-black mb-2 opacity-50">Exploration Party</span>
                <p className="font-headline font-bold text-base text-on-surface">{bookings[0].attendees}</p>
              </div>
            </div>
            <div className="mt-8 lg:mt-auto flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => handleDownload(bookings[0])}
                className="flex-1 bg-surface-container-high text-on-surface font-black uppercase tracking-widest text-[10px] py-5 rounded-xl flex items-center justify-center gap-3 hover:bg-surface-dim transition-colors border border-outline-variant/10"
              >
                <span className="material-symbols-outlined text-sm">receipt_long</span>
                Download Receipt
              </button>
              <button className="flex-1 bg-primary text-white font-black uppercase tracking-widest text-[10px] py-5 rounded-xl hover:opacity-90 transition-opacity shadow-xl shadow-primary/20">
                Modify Booking
              </button>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-surface-container-low p-1 rounded-[2.5rem] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="text-on-surface-variant">
                  <th className="px-10 py-6 text-[10px] font-black tracking-widest uppercase opacity-50">Adventure</th>
                  <th className="px-10 py-6 text-[10px] font-black tracking-widest uppercase opacity-50">Party</th>
                  <th className="px-10 py-6 text-[10px] font-black tracking-widest uppercase opacity-50">Price</th>
                  <th className="px-10 py-6 text-[10px] font-black tracking-widest uppercase opacity-50">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black tracking-widest uppercase opacity-50 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {bookings.map((item, idx) => (
                  <tr key={idx} className={`bg-surface-container-lowest/50 hover:bg-white transition-all group ${item.status === 'CANCELLED' ? 'opacity-50' : ''}`}>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4 min-w-[200px]">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm transition-transform group-hover:scale-105 shrink-0">
                          <img alt="Safari" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={item.img} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-headline font-bold text-base text-on-surface truncate">{item.name}</p>
                          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-black opacity-60 mt-1">{item.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-sm font-bold text-on-surface-variant whitespace-nowrap">{item.attendees}</td>
                    <td className="px-10 py-6 text-sm font-black text-on-surface whitespace-nowrap">{item.price}</td>
                    <td className="px-10 py-6">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
                        item.status === 'CONFIRMED' ? 'bg-secondary text-white' : 
                        item.status === 'PENDING' ? 'bg-surface-container-highest text-on-surface-variant' : 
                        'bg-error text-white'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleDownload(item)}
                          className="p-2 bg-surface-container-high rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                          title="Download Receipt"
                        >
                          <span className="material-symbols-outlined text-sm">receipt_long</span>
                        </button>
                        <button 
                          onClick={() => setSelectedBooking(item)}
                          className="p-2 bg-surface-container-high rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                        >
                          <span className="material-symbols-outlined text-sm">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title="Expedition Details"
      >
        {selectedBooking && (
          <div className="space-y-8">
            <div className="flex items-center gap-6">
               <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                 <img src={selectedBooking.img} className="w-full h-full object-cover" />
               </div>
               <div>
                 <h3 className="text-2xl font-black font-headline text-on-background">{selectedBooking.name}</h3>
                 <p className="text-primary font-bold">{selectedBooking.bookingId}</p>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Status</p>
                 <p className="text-sm font-bold text-on-surface">{selectedBooking.status}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Amount Paid</p>
                 <p className="text-sm font-black text-primary">{selectedBooking.price}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Timeline</p>
                 <p className="text-sm font-bold text-on-surface">{selectedBooking.date}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Exploration Party</p>
                 <p className="text-sm font-bold text-on-surface">{selectedBooking.attendees}</p>
               </div>
            </div>

            <div className="p-6 bg-surface-container-low rounded-[2rem] border border-outline-variant/10">
               <p className="text-xs text-on-surface-variant font-medium leading-relaxed italic">
                 "Prepare for the savannah. Your itinerary includes private guided tours, nocturnal photography sessions, and luxury camp access."
               </p>
            </div>

            <div className="flex gap-4">
               <button 
                 onClick={() => handleDownload(selectedBooking)}
                 className="flex-1 bg-on-background text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl"
               >
                 Download Full Document
               </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
