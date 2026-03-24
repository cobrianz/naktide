"use client";

import { useMemo, useState } from "react";

import type { InventoryItem, InventoryStatus } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { titleCase } from "@/lib/formatters";

const statuses: InventoryStatus[] = ["scheduled", "draft", "archived"];
const emptyForm = {
  adventureId: "",
  title: "",
  departureDate: "",
  capacity: "8",
  booked: "0",
  waitlist: "0",
  status: "scheduled" as InventoryStatus,
};

function IconButton({ icon, label, onClick, variant = "outline" }: { icon: string; label: string; onClick: () => void; variant?: "outline" | "destructive" }) {
  return (
    <Button type="button" variant={variant} size="icon-sm" className="rounded-lg" onClick={onClick}>
      <span className="material-symbols-outlined text-base">{icon}</span>
      <span className="sr-only">{label}</span>
    </Button>
  );
}

export function AdminInventoryManager({ initialInventory }: { initialInventory: InventoryItem[] }) {
  const [inventory, setInventory] = useState(initialInventory);
  const [createForm, setCreateForm] = useState(emptyForm);
  const [viewItem, setViewItem] = useState<InventoryItem | null>(null);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<InventoryItem | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);

  const openSeats = useMemo(() => inventory.reduce((sum, item) => sum + Math.max(item.capacity - item.booked, 0), 0), [inventory]);

  function openEdit(item: InventoryItem) {
    setEditItem(item);
    setEditForm({
      adventureId: item.adventureId,
      title: item.title,
      departureDate: item.departureDate,
      capacity: String(item.capacity),
      booked: String(item.booked),
      waitlist: String(item.waitlist),
      status: item.status,
    });
  }

  async function createItem() {
    const response = await fetch("/api/admin/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...createForm,
        capacity: Number(createForm.capacity) || 0,
        booked: Number(createForm.booked) || 0,
        waitlist: Number(createForm.waitlist) || 0,
      }),
    });
    const payload = await response.json();
    if (!payload.data) return;
    setInventory((current) => [payload.data, ...current]);
    setCreateForm(emptyForm);
  }

  async function updateItem() {
    if (!editItem) return;
    const response = await fetch("/api/admin/inventory", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editItem.id,
        ...editForm,
        capacity: Number(editForm.capacity) || 0,
        booked: Number(editForm.booked) || 0,
        waitlist: Number(editForm.waitlist) || 0,
      }),
    });
    const payload = await response.json();
    if (!payload.data) return;
    setInventory((current) => current.map((item) => (item.id === editItem.id ? payload.data : item)));
    setEditItem(null);
  }

  async function removeItem() {
    if (!deleteItem) return;
    await fetch("/api/admin/inventory", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteItem.id }),
    });
    setInventory((current) => current.filter((item) => item.id !== deleteItem.id));
    setDeleteItem(null);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
      <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
        <CardHeader>
          <CardTitle className="text-[#23180d]">Inventory controls</CardTitle>
          <p className="text-sm text-[#6d5c48]">{inventory.length} departures tracked | {openSeats} open seats</p>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Input value={createForm.title} onChange={(event) => setCreateForm({ ...createForm, title: event.target.value })} placeholder="Departure title" />
          <Input value={createForm.adventureId} onChange={(event) => setCreateForm({ ...createForm, adventureId: event.target.value })} placeholder="Tour id" />
          <Input type="date" value={createForm.departureDate} onChange={(event) => setCreateForm({ ...createForm, departureDate: event.target.value })} />
          <div className="grid grid-cols-3 gap-3">
            <Input type="number" min="0" value={createForm.capacity} onChange={(event) => setCreateForm({ ...createForm, capacity: event.target.value })} placeholder="Capacity" />
            <Input type="number" min="0" value={createForm.booked} onChange={(event) => setCreateForm({ ...createForm, booked: event.target.value })} placeholder="Booked" />
            <Input type="number" min="0" value={createForm.waitlist} onChange={(event) => setCreateForm({ ...createForm, waitlist: event.target.value })} placeholder="Waitlist" />
          </div>
          <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm" value={createForm.status} onChange={(event) => setCreateForm({ ...createForm, status: event.target.value as InventoryStatus })}>
            {statuses.map((status) => <option key={status} value={status}>{titleCase(status)}</option>)}
          </select>
          <Button className="rounded-lg bg-[#9f5f2a] text-white" onClick={createItem}>Create departure</Button>
        </CardContent>
      </Card>

      <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
        <CardHeader><CardTitle className="text-[#23180d]">Departure inventory</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow className="border-[#eadbc7] hover:bg-transparent">
                <TableHead className="px-6 text-[#8b7a66]">Title</TableHead>
                <TableHead className="text-[#8b7a66]">Departure</TableHead>
                <TableHead className="text-[#8b7a66]">Capacity</TableHead>
                <TableHead className="text-[#8b7a66]">Booked</TableHead>
                <TableHead className="text-[#8b7a66]">Waitlist</TableHead>
                <TableHead className="text-[#8b7a66]">Status</TableHead>
                <TableHead className="px-6 text-right text-[#8b7a66]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id} className="border-[#eadbc7] hover:bg-[#faf1e4]">
                  <TableCell className="px-6 font-semibold text-[#23180d]">
                    <div>
                      <p>{item.title}</p>
                      <p className="text-xs text-[#6d5c48]">{item.adventureId}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#23180d]">{item.departureDate}</TableCell>
                  <TableCell className="text-[#23180d]">{item.capacity}</TableCell>
                  <TableCell className="text-[#23180d]">{item.booked}</TableCell>
                  <TableCell className="text-[#23180d]">{item.waitlist}</TableCell>
                  <TableCell className="text-[#23180d]">{titleCase(item.status)}</TableCell>
                  <TableCell className="px-6">
                    <div className="flex justify-end gap-2">
                      <IconButton icon="visibility" label="View inventory item" onClick={() => setViewItem(item)} />
                      <IconButton icon="edit" label="Edit inventory item" onClick={() => openEdit(item)} />
                      <IconButton icon="delete" label="Delete inventory item" variant="destructive" onClick={() => setDeleteItem(item)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!viewItem} onOpenChange={(open) => { if (!open) setViewItem(null); }}>
        <DialogContent className="max-w-lg rounded-lg bg-[#fffaf2]">
          <DialogHeader>
            <DialogTitle>{viewItem?.title}</DialogTitle>
            <DialogDescription>Departure-level inventory detail.</DialogDescription>
          </DialogHeader>
          {viewItem ? (
            <div className="grid gap-4 rounded-lg border border-[#eadbc7] bg-white p-4 md:grid-cols-2">
              <div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Tour id</p><p className="mt-2 text-sm text-[#23180d]">{viewItem.adventureId}</p></div>
              <div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Departure</p><p className="mt-2 text-sm text-[#23180d]">{viewItem.departureDate}</p></div>
              <div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Capacity</p><p className="mt-2 text-sm text-[#23180d]">{viewItem.capacity}</p></div>
              <div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Booked</p><p className="mt-2 text-sm text-[#23180d]">{viewItem.booked}</p></div>
              <div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Waitlist</p><p className="mt-2 text-sm text-[#23180d]">{viewItem.waitlist}</p></div>
              <div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Status</p><p className="mt-2 text-sm text-[#23180d]">{titleCase(viewItem.status)}</p></div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onOpenChange={(open) => { if (!open) setEditItem(null); }}>
        <DialogContent className="max-w-xl rounded-lg bg-[#fffaf2]">
          <DialogHeader>
            <DialogTitle>Edit inventory</DialogTitle>
            <DialogDescription>Update departure capacity, bookings, and waitlist counts.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Input value={editForm.title} onChange={(event) => setEditForm({ ...editForm, title: event.target.value })} placeholder="Departure title" />
            <Input value={editForm.adventureId} onChange={(event) => setEditForm({ ...editForm, adventureId: event.target.value })} placeholder="Tour id" />
            <Input type="date" value={editForm.departureDate} onChange={(event) => setEditForm({ ...editForm, departureDate: event.target.value })} />
            <div className="grid grid-cols-3 gap-3">
              <Input type="number" min="0" value={editForm.capacity} onChange={(event) => setEditForm({ ...editForm, capacity: event.target.value })} />
              <Input type="number" min="0" value={editForm.booked} onChange={(event) => setEditForm({ ...editForm, booked: event.target.value })} />
              <Input type="number" min="0" value={editForm.waitlist} onChange={(event) => setEditForm({ ...editForm, waitlist: event.target.value })} />
            </div>
            <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm" value={editForm.status} onChange={(event) => setEditForm({ ...editForm, status: event.target.value as InventoryStatus })}>
              {statuses.map((status) => <option key={status} value={status}>{titleCase(status)}</option>)}
            </select>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-lg" onClick={() => setEditItem(null)}>Cancel</Button>
            <Button className="rounded-lg bg-[#9f5f2a] text-white" onClick={updateItem}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteItem} onOpenChange={(open) => { if (!open) setDeleteItem(null); }}>
        <DialogContent className="max-w-md rounded-lg bg-[#fffaf2]">
          <DialogHeader>
            <DialogTitle>Delete inventory item</DialogTitle>
            <DialogDescription>Remove this departure from the inventory schedule.</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-[#6d5c48]">Delete {deleteItem?.title}?</p>
          <DialogFooter>
            <Button variant="outline" className="rounded-lg" onClick={() => setDeleteItem(null)}>Cancel</Button>
            <Button variant="destructive" className="rounded-lg" onClick={removeItem}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
