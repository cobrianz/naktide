"use client";

import { useState } from "react";

import type { AdminCustomer } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDateTime } from "@/lib/formatters";

export function AdminCustomersManager({ initialCustomers }: { initialCustomers: AdminCustomer[] }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [form, setForm] = useState({ name: "", email: "", phone: "", tier: "Voyager", lifetimeValue: "0", activeBookings: "0" });
  const [editingId, setEditingId] = useState<string | null>(null);

  async function createCustomer() {
    const response = await fetch("/api/admin/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        lifetimeValue: Number(form.lifetimeValue),
        activeBookings: Number(form.activeBookings),
      }),
    });
    const payload = await response.json();
    setCustomers((current) => [payload.data, ...current]);
    setForm({ name: "", email: "", phone: "", tier: "Voyager", lifetimeValue: "0", activeBookings: "0" });
  }

  async function updateCustomer(id: string, partial: Partial<AdminCustomer>) {
    await fetch("/api/admin/customers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...partial }),
    });
    setCustomers((current) => current.map((customer) => (customer.id === id ? { ...customer, ...partial } : customer)));
  }

  async function deleteCustomer(id: string) {
    await fetch("/api/admin/customers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setCustomers((current) => current.filter((customer) => customer.id !== id));
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
      <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
        <CardHeader>
          <CardTitle className="text-[#23180d]">Add traveler</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Traveler name" className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
          <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
          <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
          <Input value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} placeholder="Tier" className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
          <div className="grid grid-cols-2 gap-3">
            <Input value={form.lifetimeValue} onChange={(e) => setForm({ ...form, lifetimeValue: e.target.value })} placeholder="Lifetime value" className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
            <Input value={form.activeBookings} onChange={(e) => setForm({ ...form, activeBookings: e.target.value })} placeholder="Active bookings" className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
          </div>
          <Button className="mt-2 rounded-lg bg-[#9f5f2a] text-white" onClick={createCustomer}>Create traveler</Button>
        </CardContent>
      </Card>

      <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
        <CardHeader>
          <CardTitle className="text-[#23180d]">Traveler CRM</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow className="border-[#eadbc7] hover:bg-transparent">
                <TableHead className="px-6 text-[#8b7a66]">Traveler</TableHead>
                <TableHead className="text-[#8b7a66]">Tier</TableHead>
                <TableHead className="text-[#8b7a66]">Last seen</TableHead>
                <TableHead className="text-[#8b7a66]">LTV</TableHead>
                <TableHead className="text-[#8b7a66]">Bookings</TableHead>
                <TableHead className="px-6 text-right text-[#8b7a66]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => {
                const editing = editingId === customer.id;
                return (
                  <TableRow key={customer.id} className="border-[#eadbc7] hover:bg-[#faf1e4]">
                    <TableCell className="px-6">
                      <div className="space-y-2">
                        <Input value={customer.name} onChange={(e) => updateCustomer(customer.id, { name: e.target.value })} className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
                        <Input value={customer.email} onChange={(e) => updateCustomer(customer.id, { email: e.target.value })} className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input value={customer.tier} onChange={(e) => updateCustomer(customer.id, { tier: e.target.value })} className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
                    </TableCell>
                    <TableCell className="text-[#23180d]">{formatDateTime(customer.lastSeen)}</TableCell>
                    <TableCell>
                      <Input value={String(customer.lifetimeValue)} onChange={(e) => updateCustomer(customer.id, { lifetimeValue: Number(e.target.value) || 0 })} className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
                      <p className="mt-2 text-xs text-[#6d5c48]">{formatCurrency(customer.lifetimeValue)}</p>
                    </TableCell>
                    <TableCell>
                      <Input value={String(customer.activeBookings)} onChange={(e) => updateCustomer(customer.id, { activeBookings: Number(e.target.value) || 0 })} className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
                    </TableCell>
                    <TableCell className="px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" className="rounded-lg border-[#d8c9b4] bg-white" onClick={() => setEditingId(editing ? null : customer.id)}>
                          {editing ? "Editing" : "Edit"}
                        </Button>
                        <Button variant="destructive" className="rounded-lg" onClick={() => deleteCustomer(customer.id)}>Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
