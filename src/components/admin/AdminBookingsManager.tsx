"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { Booking, BookingStatus } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, titleCase } from "@/lib/formatters";

const statuses: BookingStatus[] = ["confirmed", "pending", "cancelled", "completed"];
const emptyMessageForm = { subject: "", body: "" };
const emptyPostponeForm = { travelDate: "", note: "", body: "" };
const emptyEditForm = { travelDate: "", status: "pending" as BookingStatus, partySize: "1", notes: "" };

function IconButton({ icon, label, onClick, variant = "outline" }: { icon: string; label: string; onClick: () => void; variant?: "outline" | "destructive" | "ghost" }) {
  return (
    <Button type="button" variant={variant} size="icon-sm" className="rounded-lg" onClick={onClick}>
      <span className="material-symbols-outlined text-base">{icon}</span>
      <span className="sr-only">{label}</span>
    </Button>
  );
}

export function AdminBookingsManager({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [viewBooking, setViewBooking] = useState<Booking | null>(null);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [messageBooking, setMessageBooking] = useState<Booking | null>(null);
  const [postponeBooking, setPostponeBooking] = useState<Booking | null>(null);
  const [deleteBookingItem, setDeleteBookingItem] = useState<Booking | null>(null);
  const [editForm, setEditForm] = useState(emptyEditForm);
  const [messageForm, setMessageForm] = useState(emptyMessageForm);
  const [postponeForm, setPostponeForm] = useState(emptyPostponeForm);

  const revenue = useMemo(() => bookings.reduce((sum, booking) => sum + booking.amount, 0), [bookings]);

  async function patchBooking(id: string, partial: Record<string, unknown>) {
    const response = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...partial }),
    });
    const payload = await response.json();
    if (!payload.data) return undefined;
    setBookings((current) => current.map((booking) => (booking.id === id ? payload.data : booking)));
    return payload.data as Booking;
  }

  function openEdit(booking: Booking) {
    setEditBooking(booking);
    setEditForm({
      travelDate: booking.travelDate,
      status: booking.status,
      partySize: String(booking.partySize),
      notes: booking.notes,
    });
  }

  async function saveEdit() {
    if (!editBooking) return;
    await patchBooking(editBooking.id, {
      travelDate: editForm.travelDate,
      status: editForm.status,
      partySize: Number(editForm.partySize) || 1,
      notes: editForm.notes,
    });
    setEditBooking(null);
  }

  function openMessage(booking: Booking) {
    setMessageBooking(booking);
    setMessageForm({
      subject: `Update for ${booking.adventureTitle}`,
      body: `Hello ${booking.travelers?.join(", ") ?? booking.customerName},\n\nThis is an operational update for your ${booking.travelDate} departure.`,
    });
  }

  async function sendGroupMessage() {
    if (!messageBooking || !messageForm.body.trim()) return;
    await patchBooking(messageBooking.id, {
      messageSubject: messageForm.subject,
      messageBody: messageForm.body,
    });
    setMessageBooking(null);
    setMessageForm(emptyMessageForm);
  }

  function openPostpone(booking: Booking) {
    setPostponeBooking(booking);
    setPostponeForm({
      travelDate: booking.travelDate,
      note: booking.notes,
      body: `Your departure for ${booking.adventureTitle} has been moved to a new operating date.`,
    });
  }

  async function savePostpone() {
    if (!postponeBooking) return;
    await patchBooking(postponeBooking.id, {
      travelDate: postponeForm.travelDate,
      status: "pending",
      notes: postponeForm.note,
      messageSubject: `Schedule update for ${postponeBooking.adventureTitle}`,
      messageBody: postponeForm.body,
    });
    setPostponeBooking(null);
    setPostponeForm(emptyPostponeForm);
  }

  async function removeBooking() {
    if (!deleteBookingItem) return;
    await fetch("/api/admin/bookings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteBookingItem.id }),
    });
    setBookings((current) => current.filter((booking) => booking.id !== deleteBookingItem.id));
    setDeleteBookingItem(null);
  }

  return (
    <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
      <CardHeader className="flex flex-col gap-4 border-b border-[#eadbc7] md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-[#23180d]">Booking operations</CardTitle>
          <p className="mt-2 text-sm text-[#6d5c48]">Manage groups, shift departures, message travelers, and keep booking notes accurate.</p>
        </div>
        <div className="rounded-lg border border-[#eadbc7] bg-white px-4 py-2 text-sm text-[#6d5c48]">
          {bookings.length} bookings | {formatCurrency(revenue, "KES")}
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0 pb-0">
        <Table className="min-w-[860px]">
          <TableHeader>
            <TableRow className="border-[#eadbc7] hover:bg-transparent">
              <TableHead className="px-6 text-[#8b7a66]">Reference</TableHead>
              <TableHead className="text-[#8b7a66]">Tour</TableHead>
              <TableHead className="text-[#8b7a66]">Travelers</TableHead>
              <TableHead className="text-[#8b7a66]">Date</TableHead>
              <TableHead className="text-[#8b7a66]">Status</TableHead>
              <TableHead className="text-[#8b7a66]">Amount</TableHead>
              <TableHead className="px-6 text-right text-[#8b7a66]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id} className="border-[#eadbc7] hover:bg-[#faf1e4]">
                <TableCell className="px-6 text-[#23180d]">{booking.reference}</TableCell>
                <TableCell>
                  <p className="font-semibold text-[#23180d]">{booking.adventureTitle}</p>
                  <p className="text-xs text-[#6d5c48]">{booking.customerName}</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium text-[#23180d]">{booking.travelers?.[0] ?? booking.customerName}</p>
                  <p className="text-xs text-[#6d5c48]">{booking.travelers?.length ?? booking.partySize} in group</p>
                </TableCell>
                <TableCell className="text-[#23180d]">{booking.travelDate}</TableCell>
                <TableCell>
                  <Badge variant={booking.status === "pending" ? "outline" : "secondary"}>{titleCase(booking.status)}</Badge>
                </TableCell>
                <TableCell className="text-[#23180d]">{formatCurrency(booking.amount, booking.currency)}</TableCell>
                <TableCell className="px-6">
                  <div className="flex justify-end gap-2">
                    <IconButton icon="visibility" label="View booking" onClick={() => setViewBooking(booking)} />
                    <IconButton icon="edit" label="Edit booking" onClick={() => openEdit(booking)} />
                    <IconButton icon="mail" label="Message group" onClick={() => openMessage(booking)} />
                    <IconButton icon="event_repeat" label="Postpone booking" onClick={() => openPostpone(booking)} />
                    <Link href={`/admin/bookings/${booking.id}`} className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-input bg-background text-foreground shadow-xs transition hover:bg-accent hover:text-accent-foreground">
                      <span className="material-symbols-outlined text-base">receipt_long</span>
                      <span className="sr-only">View receipt</span>
                    </Link>
                    <IconButton icon="delete" label="Delete booking" variant="destructive" onClick={() => setDeleteBookingItem(booking)} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={!!viewBooking} onOpenChange={(open) => { if (!open) setViewBooking(null); }}>
        <DialogContent className="max-w-2xl rounded-lg bg-[#fffaf2]">
          <DialogHeader>
            <DialogTitle>{viewBooking?.adventureTitle}</DialogTitle>
            <DialogDescription>Group-level traveler and booking details.</DialogDescription>
          </DialogHeader>
          {viewBooking ? (
            <div className="grid gap-4">
              <div className="grid gap-4 rounded-lg border border-[#eadbc7] bg-white p-4 md:grid-cols-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Reference</p>
                  <p className="mt-2 text-sm text-[#23180d]">{viewBooking.reference}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Date</p>
                  <p className="mt-2 text-sm text-[#23180d]">{viewBooking.travelDate}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Status</p>
                  <p className="mt-2 text-sm text-[#23180d]">{titleCase(viewBooking.status)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Amount</p>
                  <p className="mt-2 text-sm text-[#23180d]">{formatCurrency(viewBooking.amount, viewBooking.currency)}</p>
                </div>
              </div>
              <div className="rounded-lg border border-[#eadbc7] bg-white p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Travel group</p>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {(viewBooking.travelers ?? [viewBooking.customerName]).map((traveler) => (
                    <div key={traveler} className="rounded-lg border border-[#eadbc7] bg-[#fffaf2] px-3 py-2 text-sm text-[#23180d]">{traveler}</div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-[#eadbc7] bg-white p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Operations notes</p>
                <p className="mt-3 text-sm leading-7 text-[#6d5c48]">{viewBooking.notes}</p>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editBooking} onOpenChange={(open) => { if (!open) setEditBooking(null); }}>
        <DialogContent className="max-w-xl rounded-lg bg-[#fffaf2]">
          <DialogHeader>
            <DialogTitle>Edit booking</DialogTitle>
            <DialogDescription>Update travel date, status, party size, and operational notes.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Input type="date" value={editForm.travelDate} onChange={(event) => setEditForm({ ...editForm, travelDate: event.target.value })} />
            <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm" value={editForm.status} onChange={(event) => setEditForm({ ...editForm, status: event.target.value as BookingStatus })}>
              {statuses.map((status) => <option key={status} value={status}>{titleCase(status)}</option>)}
            </select>
            <Input type="number" min="1" value={editForm.partySize} onChange={(event) => setEditForm({ ...editForm, partySize: event.target.value })} />
            <Textarea value={editForm.notes} onChange={(event) => setEditForm({ ...editForm, notes: event.target.value })} placeholder="Operations notes" />
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-lg" onClick={() => setEditBooking(null)}>Cancel</Button>
            <Button className="rounded-lg bg-[#9f5f2a] text-white" onClick={saveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!messageBooking} onOpenChange={(open) => { if (!open) setMessageBooking(null); }}>
        <DialogContent className="max-w-xl rounded-lg bg-[#fffaf2]">
          <DialogHeader>
            <DialogTitle>Message booking group</DialogTitle>
            <DialogDescription>Send an operations note to every traveler on this booking.</DialogDescription>
          </DialogHeader>
          {messageBooking ? (
            <div className="grid gap-3">
              <div className="rounded-lg border border-[#eadbc7] bg-white p-4 text-sm text-[#23180d]">
                <p className="font-semibold">Recipients</p>
                <p className="mt-2 text-[#6d5c48]">{(messageBooking.travelers ?? [messageBooking.customerName]).join(", ")}</p>
              </div>
              <Input value={messageForm.subject} onChange={(event) => setMessageForm({ ...messageForm, subject: event.target.value })} placeholder="Subject" />
              <Textarea value={messageForm.body} onChange={(event) => setMessageForm({ ...messageForm, body: event.target.value })} placeholder="Message body" />
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="outline" className="rounded-lg" onClick={() => setMessageBooking(null)}>Cancel</Button>
            <Button className="rounded-lg bg-[#9f5f2a] text-white" onClick={sendGroupMessage}>Send message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!postponeBooking} onOpenChange={(open) => { if (!open) setPostponeBooking(null); }}>
        <DialogContent className="max-w-xl rounded-lg bg-[#fffaf2]">
          <DialogHeader>
            <DialogTitle>Postpone booking</DialogTitle>
            <DialogDescription>Shift the departure date and optionally notify the travel group.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Input type="date" value={postponeForm.travelDate} onChange={(event) => setPostponeForm({ ...postponeForm, travelDate: event.target.value })} />
            <Textarea value={postponeForm.note} onChange={(event) => setPostponeForm({ ...postponeForm, note: event.target.value })} placeholder="Update operations notes" />
            <Textarea value={postponeForm.body} onChange={(event) => setPostponeForm({ ...postponeForm, body: event.target.value })} placeholder="Traveler message" />
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-lg" onClick={() => setPostponeBooking(null)}>Cancel</Button>
            <Button className="rounded-lg bg-[#9f5f2a] text-white" onClick={savePostpone}>Postpone booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteBookingItem} onOpenChange={(open) => { if (!open) setDeleteBookingItem(null); }}>
        <DialogContent className="max-w-md rounded-lg bg-[#fffaf2]">
          <DialogHeader>
            <DialogTitle>Delete booking</DialogTitle>
            <DialogDescription>This removes the booking from the admin mock data.</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-[#6d5c48]">Delete {deleteBookingItem?.reference} for {deleteBookingItem?.customerName}?</p>
          <DialogFooter>
            <Button variant="outline" className="rounded-lg" onClick={() => setDeleteBookingItem(null)}>Cancel</Button>
            <Button variant="destructive" className="rounded-lg" onClick={removeBooking}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}


