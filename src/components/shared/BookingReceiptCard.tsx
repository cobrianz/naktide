import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Booking } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { ReceiptDownloadButton } from "@/components/shared/ReceiptDownloadButton";

export function BookingReceiptCard({
  booking,
  surface = "light",
}: {
  booking: Booking;
  surface?: "light" | "sand";
}) {
  const cardClass =
    surface === "sand"
      ? "rounded-xl border-[#d8c9b4] bg-[#fffaf2]"
      : "rounded-xl border-white/70 bg-white/80";

  return (
    <Card className={cardClass}>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">
              Receipt
            </p>
            <CardTitle className="mt-2 text-2xl font-black tracking-tight">
              {booking.reference}
            </CardTitle>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <p>NakTide Expeditions</p>
            <p>Nairobi, Kenya</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-black/5 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Traveler</p>
            <p className="mt-3 text-lg font-semibold">{booking.customerName}</p>
            <p className="mt-1 text-sm text-muted-foreground">Customer ID: {booking.customerId}</p>
          </div>
          <div className="rounded-xl bg-black/5 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Journey</p>
            <p className="mt-3 text-lg font-semibold">{booking.adventureTitle}</p>
            <p className="mt-1 text-sm text-muted-foreground">{booking.location}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">Travel date</p>
            <p className="mt-2 font-semibold">{formatDate(booking.travelDate)}</p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">Party size</p>
            <p className="mt-2 font-semibold">{booking.partySize} travelers</p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">Status</p>
            <p className="mt-2 font-semibold capitalize">{booking.status}</p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">Amount paid</p>
            <p className="mt-2 font-semibold">{formatCurrency(booking.amount, booking.currency)}</p>
          </div>
        </div>

        <div className="rounded-xl border border-black/10 p-4">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">Notes</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{booking.notes}</p>
        </div>

        <ReceiptDownloadButton booking={booking} />
      </CardContent>
    </Card>
  );
}
