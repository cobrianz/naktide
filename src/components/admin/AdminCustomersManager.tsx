"use client";

import { useMemo, useState } from "react";

import type { AdminCustomer } from "@/lib/mock-data";
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
import { formatCurrency, formatDateTime } from "@/lib/formatters";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  tier: "Voyager",
  lifetimeValue: "0",
  activeBookings: "0",
};

function IconButton({ icon, label, onClick, variant = "outline" }: { icon: string; label: string; onClick: () => void; variant?: "outline" | "destructive" | "ghost" }) {
  return (
    <Button type="button" variant={variant} size="icon-sm" className="rounded-lg" onClick={onClick}>
      <span className="material-symbols-outlined text-base">{icon}</span>
      <span className="sr-only">{label}</span>
    </Button>
  );
}

export function AdminCustomersManager({ initialCustomers }: { initialCustomers: AdminCustomer[] }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [createOpen, setCreateOpen] = useState(false);
  const [viewCustomer, setViewCustomer] = useState<AdminCustomer | null>(null);
  const [editCustomer, setEditCustomer] = useState<AdminCustomer | null>(null);
  const [deleteCustomerItem, setDeleteCustomerItem] = useState<AdminCustomer | null>(null);
  const [createForm, setCreateForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(emptyForm);

  const totalValue = useMemo(() => customers.reduce((sum, customer) => sum + customer.lifetimeValue, 0), [customers]);

  async function createCustomer() {
    const response = await fetch("/api/admin/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...createForm,
        lifetimeValue: Number(createForm.lifetimeValue) || 0,
        activeBookings: Number(createForm.activeBookings) || 0,
      }),
    });
    const payload = await response.json();
    if (!payload.data) return;
    setCustomers((current) => [payload.data, ...current]);
    setCreateForm(emptyForm);
    setCreateOpen(false);
  }

  function openEdit(customer: AdminCustomer) {
    setEditCustomer(customer);
    setEditForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      tier: customer.tier,
      lifetimeValue: String(customer.lifetimeValue),
      activeBookings: String(customer.activeBookings),
    });
  }

  async function saveCustomerEdit() {
    if (!editCustomer) return;
    const response = await fetch("/api/admin/customers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editCustomer.id,
        ...editForm,
        lifetimeValue: Number(editForm.lifetimeValue) || 0,
        activeBookings: Number(editForm.activeBookings) || 0,
      }),
    });
    const payload = await response.json();
    if (!payload.data) return;
    setCustomers((current) => current.map((customer) => (customer.id === editCustomer.id ? payload.data : customer)));
    setEditCustomer(null);
  }

  async function removeCustomer() {
    if (!deleteCustomerItem) return;
    await fetch("/api/admin/customers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteCustomerItem.id }),
    });
    setCustomers((current) => current.filter((customer) => customer.id !== deleteCustomerItem.id));
    setDeleteCustomerItem(null);
  }

  return (
    <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
      <CardHeader className="flex flex-col gap-4 border-b border-[#eadbc7] md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-[#23180d]">Traveler CRM</CardTitle>
          <p className="mt-2 text-sm text-[#6d5c48]">View traveler history, update profiles, and manage VIP value from one place.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-lg border border-[#eadbc7] bg-white px-4 py-2 text-sm text-[#6d5c48]">
            {customers.length} travelers | {formatCurrency(totalValue)} lifetime value
          </div>
          <Button className="rounded-lg bg-[#9f5f2a] text-white" onClick={() => setCreateOpen(true)}>
            <span className="material-symbols-outlined mr-2 text-base">person_add</span>
            Add traveler
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="border-[#eadbc7] hover:bg-transparent">
              <TableHead className="px-6 text-[#8b7a66]">Traveler</TableHead>
              <TableHead className="text-[#8b7a66]">Tier</TableHead>
              <TableHead className="text-[#8b7a66]">Phone</TableHead>
              <TableHead className="text-[#8b7a66]">Last seen</TableHead>
              <TableHead className="text-[#8b7a66]">LTV</TableHead>
              <TableHead className="text-[#8b7a66]">Bookings</TableHead>
              <TableHead className="px-6 text-right text-[#8b7a66]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="border-[#eadbc7] hover:bg-[#faf1e4]">
                <TableCell className="px-6">
                  <p className="font-semibold text-[#23180d]">{customer.name}</p>
                  <p className="text-xs text-[#6d5c48]">{customer.email}</p>
                </TableCell>
                <TableCell className="text-[#23180d]">{customer.tier}</TableCell>
                <TableCell className="text-[#23180d]">{customer.phone}</TableCell>
                <TableCell className="text-[#23180d]">{formatDateTime(customer.lastSeen)}</TableCell>
                <TableCell className="text-[#23180d]">{formatCurrency(customer.lifetimeValue)}</TableCell>
                <TableCell className="text-[#23180d]">{customer.activeBookings}</TableCell>
                <TableCell className="px-6">
                  <div className="flex justify-end gap-2">
                    <IconButton icon="visibility" label="View traveler" onClick={() => setViewCustomer(customer)} />
                    <IconButton icon="edit" label="Edit traveler" onClick={() => openEdit(customer)} />
                    <IconButton icon="delete" label="Delete traveler" variant="destructive" onClick={() => setDeleteCustomerItem(customer)} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-xl rounded-lg bg-[#fffaf2]">
          <DialogHeader>
            <DialogTitle>Add traveler</DialogTitle>
            <DialogDescription>Create a traveler profile for bookings, billing, and concierge operations.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Input value={createForm.name} onChange={(event) => setCreateForm({ ...createForm, name: event.target.value })} placeholder="Traveler name" />
            <Input value={createForm.email} onChange={(event) => setCreateForm({ ...createForm, email: event.target.value })} placeholder="Email" />
            <Input value={createForm.phone} onChange={(event) => setCreateForm({ ...createForm, phone: event.target.value })} placeholder="Phone" />
            <Input value={createForm.tier} onChange={(event) => setCreateForm({ ...createForm, tier: event.target.value })} placeholder="Tier" />
            <div className="grid gap-3 md:grid-cols-2">
              <Input value={createForm.lifetimeValue} onChange={(event) => setCreateForm({ ...createForm, lifetimeValue: event.target.value })} placeholder="Lifetime value" />
              <Input value={createForm.activeBookings} onChange={(event) => setCreateForm({ ...createForm, activeBookings: event.target.value })} placeholder="Active bookings" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-lg" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button className="rounded-lg bg-[#9f5f2a] text-white" onClick={createCustomer}>Create traveler</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewCustomer} onOpenChange={(open) => { if (!open) setViewCustomer(null); }}>
        <DialogContent className="max-w-lg rounded-lg bg-[#fffaf2]">
          <DialogHeader>
            <DialogTitle>{viewCustomer?.name}</DialogTitle>
            <DialogDescription>Traveler profile details and commercial value.</DialogDescription>
          </DialogHeader>
          {viewCustomer ? (
            <div className="grid gap-4 rounded-lg border border-[#eadbc7] bg-white p-4 text-sm text-[#23180d]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Email</p>
                <p className="mt-2">{viewCustomer.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Phone</p>
                <p className="mt-2">{viewCustomer.phone}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Tier</p>
                  <p className="mt-2">{viewCustomer.tier}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Active bookings</p>
                  <p className="mt-2">{viewCustomer.activeBookings}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">LTV</p>
                  <p className="mt-2">{formatCurrency(viewCustomer.lifetimeValue)}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9f5f2a]">Last seen</p>
                <p className="mt-2">{formatDateTime(viewCustomer.lastSeen)}</p>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editCustomer} onOpenChange={(open) => { if (!open) setEditCustomer(null); }}>
        <DialogContent className="max-w-xl rounded-lg bg-[#fffaf2]">
          <DialogHeader>
            <DialogTitle>Edit traveler</DialogTitle>
            <DialogDescription>Update contact information, tier, and booking value.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Input value={editForm.name} onChange={(event) => setEditForm({ ...editForm, name: event.target.value })} placeholder="Traveler name" />
            <Input value={editForm.email} onChange={(event) => setEditForm({ ...editForm, email: event.target.value })} placeholder="Email" />
            <Input value={editForm.phone} onChange={(event) => setEditForm({ ...editForm, phone: event.target.value })} placeholder="Phone" />
            <Input value={editForm.tier} onChange={(event) => setEditForm({ ...editForm, tier: event.target.value })} placeholder="Tier" />
            <div className="grid gap-3 md:grid-cols-2">
              <Input value={editForm.lifetimeValue} onChange={(event) => setEditForm({ ...editForm, lifetimeValue: event.target.value })} placeholder="Lifetime value" />
              <Input value={editForm.activeBookings} onChange={(event) => setEditForm({ ...editForm, activeBookings: event.target.value })} placeholder="Active bookings" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-lg" onClick={() => setEditCustomer(null)}>Cancel</Button>
            <Button className="rounded-lg bg-[#9f5f2a] text-white" onClick={saveCustomerEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteCustomerItem} onOpenChange={(open) => { if (!open) setDeleteCustomerItem(null); }}>
        <DialogContent className="max-w-md rounded-lg bg-[#fffaf2]">
          <DialogHeader>
            <DialogTitle>Delete traveler</DialogTitle>
            <DialogDescription>This removes the traveler profile from the mock CRM.</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-[#6d5c48]">Delete {deleteCustomerItem?.name} from customers?</p>
          <DialogFooter>
            <Button variant="outline" className="rounded-lg" onClick={() => setDeleteCustomerItem(null)}>Cancel</Button>
            <Button variant="destructive" className="rounded-lg" onClick={removeCustomer}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

