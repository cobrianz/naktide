"use client";

import Link from "next/link";
import { useState } from "react";

import type { Booking, BookingStatus } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, titleCase } from "@/lib/formatters";

const statuses: BookingStatus[] = ["confirmed", "pending", "cancelled", "completed"];

export function AdminBookingsManager({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState(initialBookings);

  async function updateBookingFields(id: string, partial: Partial<Booking>) {
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...partial }),
    });
    setBookings((current) => current.map((booking) => (booking.id === id ? { ...booking, ...partial } : booking)));
  }

  async function removeBooking(id: string) {
    await fetch("/api/admin/bookings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setBookings((current) => current.filter((booking) => booking.id !== id));
  }

  return (
    <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
      <CardHeader>
        <CardTitle className="text-[#23180d]">Booking operations</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="border-[#eadbc7] hover:bg-transparent">
              <TableHead className="px-6 text-[#8b7a66]">Reference</TableHead>
              <TableHead className="text-[#8b7a66]">Tour</TableHead>
              <TableHead className="text-[#8b7a66]">Travel date</TableHead>
              <TableHead className="text-[#8b7a66]">Status</TableHead>
              <TableHead className="text-[#8b7a66]">Amount</TableHead>
              <TableHead className="text-[#8b7a66]">Party</TableHead>
              <TableHead className="text-[#8b7a66]">Notes</TableHead>
              <TableHead className="text-[#8b7a66]">View</TableHead>
              <TableHead className="px-6 text-right text-[#8b7a66]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id} className="border-[#eadbc7] hover:bg-[#faf1e4]">
                <TableCell className="px-6 text-[#23180d]">{booking.reference}</TableCell>
                <TableCell>
                  <p className="font-semibold text-[#23180d]">{booking.adventureTitle}</p>
                  <p className="text-xs text-[#6d5c48]">{booking.customerName}</p>
                  <p className="text-xs text-[#9f5f2a]">{booking.adventureId}</p>
                </TableCell>
                <TableCell>
                  <input
                    type="date"
                    value={booking.travelDate}
                    onChange={(e) => updateBookingFields(booking.id, { travelDate: e.target.value })}
                    className="rounded-md border border-[#d8c9b4] bg-[#fffaf2] px-2 py-1 text-sm text-[#23180d]"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant={booking.status === "pending" ? "outline" : "secondary"}>{titleCase(booking.status)}</Badge>
                    <select className="rounded-md border border-[#d8c9b4] bg-[#fffaf2] px-2 py-1 text-xs text-[#23180d]" value={booking.status} onChange={(e) => updateBookingFields(booking.id, { status: e.target.value as BookingStatus })}>
                      {statuses.map((status) => (
                        <option key={status} value={status}>{titleCase(status)}</option>
                      ))}
                    </select>
                  </div>
                </TableCell>
                <TableCell className="text-[#23180d]">{formatCurrency(booking.amount, booking.currency)}</TableCell>
                <TableCell>
                  <input
                    type="number"
                    min="1"
                    value={booking.partySize}
                    onChange={(e) => updateBookingFields(booking.id, { partySize: Number(e.target.value) || 1 })}
                    className="w-20 rounded-md border border-[#d8c9b4] bg-[#fffaf2] px-2 py-1 text-sm text-[#23180d]"
                  />
                </TableCell>
                <TableCell>
                  <textarea
                    value={booking.notes}
                    onChange={(e) => updateBookingFields(booking.id, { notes: e.target.value })}
                    className="min-h-20 w-64 rounded-md border border-[#d8c9b4] bg-[#fffaf2] px-3 py-2 text-sm text-[#23180d]"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/admin/bookings/${booking.id}`} className="inline-flex items-center justify-center rounded-lg border border-[#d8c9b4] bg-white px-3 py-1.5 text-sm font-medium text-[#23180d] transition-colors hover:bg-[#f7efe0]">View</Link>
                    <Link href={`/admin/bookings/${booking.id}#receipt`} className="inline-flex items-center justify-center rounded-lg bg-[#9f5f2a] px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90">Receipt</Link>
                  </div>
                </TableCell>
                <TableCell className="px-6 text-right">
                  <Button variant="destructive" className="rounded-lg" onClick={() => removeBooking(booking.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
