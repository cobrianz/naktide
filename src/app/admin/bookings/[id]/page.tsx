import Link from "next/link";
import { notFound } from "next/navigation";

import { BookingReceiptCard } from "@/components/shared/BookingReceiptCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/formatters";
import { getBookingById } from "@/lib/mock-data";

export default async function AdminBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = await getBookingById(id);

  if (!booking) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Admin booking view</p>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-[#23180d]">{booking.reference}</h2>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/bookings" className="inline-flex items-center justify-center rounded-lg border border-[#d8c9b4] bg-white px-4 py-2 text-sm font-medium text-[#23180d] transition-colors hover:bg-[#f7efe0]">Back to bookings</Link>
          <Link href="#receipt" className="inline-flex items-center justify-center rounded-lg bg-[#9f5f2a] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">Open receipt</Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
          <CardHeader><CardTitle className="text-[#23180d]">Operations detail</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <img src={booking.image} alt={booking.adventureTitle} className="h-72 w-full rounded-xl object-cover" />
            <div className="grid gap-4 md:grid-cols-2">
              <div><p className="text-xs font-black uppercase tracking-[0.24em] text-[#8b7a66]">Traveler</p><p className="mt-2 font-semibold text-[#23180d]">{booking.customerName}</p></div>
              <div><p className="text-xs font-black uppercase tracking-[0.24em] text-[#8b7a66]">Travel date</p><p className="mt-2 font-semibold text-[#23180d]">{formatDate(booking.travelDate)}</p></div>
              <div><p className="text-xs font-black uppercase tracking-[0.24em] text-[#8b7a66]">Adventure ID</p><p className="mt-2 font-semibold text-[#23180d]">{booking.adventureId}</p></div>
              <div><p className="text-xs font-black uppercase tracking-[0.24em] text-[#8b7a66]">Status</p><p className="mt-2 font-semibold capitalize text-[#23180d]">{booking.status}</p></div>
            </div>
            <div className="rounded-xl border border-[#eadbc7] bg-[#fdf7ef] p-4">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8b7a66]">Ops notes</p>
              <p className="mt-3 text-sm leading-7 text-[#6d5c48]">{booking.notes}</p>
            </div>
          </CardContent>
        </Card>

        <div id="receipt">
          <BookingReceiptCard booking={booking} surface="sand" />
        </div>
      </div>
    </div>
  );
}
