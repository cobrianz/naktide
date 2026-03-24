import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate, titleCase } from "@/lib/formatters";
import { getUserBookings } from "@/lib/mock-data";

export default async function BookingsPage() {
  const bookings = await getUserBookings();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Bookings</p>
        <h2 className="mt-2 text-4xl font-black italic tracking-tight">Traveler manifests</h2>
      </div>

      <Card className="rounded-xl border-white/70 bg-white/75">
        <CardHeader className="px-6 pt-6">
          <CardTitle>All booking records</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6">Reference</TableHead>
                <TableHead>Journey</TableHead>
                <TableHead>Travel date</TableHead>
                <TableHead>Party</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead className="px-6 text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="px-6 font-semibold">{booking.reference}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{booking.adventureTitle}</p>
                      <p className="text-xs text-muted-foreground">{booking.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(booking.travelDate)}</TableCell>
                  <TableCell>{booking.partySize} travelers</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "confirmed"
                          ? "secondary"
                          : booking.status === "pending"
                            ? "outline"
                            : booking.status === "cancelled"
                              ? "destructive"
                              : "default"
                      }
                    >
                      {titleCase(booking.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/bookings/${booking.id}`} className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">View</Link>
                      <Link href={`/dashboard/bookings/${booking.id}#receipt`} className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90">Receipt</Link>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 text-right font-semibold">
                    {formatCurrency(booking.amount, booking.currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
