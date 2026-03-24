import Link from "next/link";
import { notFound } from "next/navigation";

import { BookingReceiptCard } from "@/components/shared/BookingReceiptCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/formatters";
import { getBookingById } from "@/lib/mock-data";

export default async function DashboardBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = await getBookingById(id);

  if (!booking) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Booking detail</p>
          <h2 className="mt-2 text-4xl font-black italic tracking-tight">{booking.adventureTitle}</h2>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/bookings" className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">Back to bookings</Link>
          <Link href="#receipt" className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">Jump to receipt</Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-xl border-white/70 bg-white/80">
          <CardHeader>
            <CardTitle>Journey summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <img src={booking.image} alt={booking.adventureTitle} className="h-72 w-full rounded-xl object-cover" />
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">Location</p>
                <p className="mt-2 font-semibold">{booking.location}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">Departure</p>
                <p className="mt-2 font-semibold">{formatDate(booking.travelDate)}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">Reference</p>
                <p className="mt-2 font-semibold">{booking.reference}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">Tour link</p>
                <p className="mt-2 font-semibold">{booking.adventureId}</p>
              </div>
            </div>
            <div className="rounded-xl bg-black/5 p-4">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">Traveler notes</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{booking.notes}</p>
            </div>
          </CardContent>
        </Card>

        <div id="receipt">
          <BookingReceiptCard booking={booking} />
        </div>
      </div>
    </div>
  );
}
