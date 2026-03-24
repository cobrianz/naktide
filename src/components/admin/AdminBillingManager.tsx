"use client";

import { useMemo, useState } from "react";

import type { BillingRecord } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatters";

export function AdminBillingManager({ initialRecords }: { initialRecords: BillingRecord[] }) {
  const [records, setRecords] = useState(initialRecords);
  const [form, setForm] = useState({ supplier: "", amount: "0", currency: "KES", dueDate: "2026-04-10", status: "scheduled", note: "" });

  const totals = useMemo(() => ({
    total: records.reduce((sum, record) => sum + record.amount, 0),
    paid: records.filter((record) => record.status === "paid").reduce((sum, record) => sum + record.amount, 0),
    outstanding: records.filter((record) => record.status !== "paid").reduce((sum, record) => sum + record.amount, 0),
  }), [records]);

  async function addRecord() {
    const response = await fetch("/api/admin/billing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, amount: Number(form.amount) }),
    });
    const payload = await response.json();
    setRecords((current) => [payload.data, ...current]);
  }

  async function updateRecord(id: string, partial: Partial<BillingRecord>) {
    await fetch("/api/admin/billing", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...partial }),
    });
    setRecords((current) => current.map((record) => (record.id === id ? { ...record, ...partial } : record)));
  }

  async function deleteRecord(id: string) {
    await fetch("/api/admin/billing", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setRecords((current) => current.filter((record) => record.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2]"><CardContent className="p-5"><p className="text-xs uppercase tracking-[0.28em] text-[#8b7a66]">Total financials</p><p className="mt-3 text-3xl font-black text-[#23180d]">{formatCurrency(totals.total)}</p></CardContent></Card>
        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2]"><CardContent className="p-5"><p className="text-xs uppercase tracking-[0.28em] text-[#8b7a66]">Paid out</p><p className="mt-3 text-3xl font-black text-[#23180d]">{formatCurrency(totals.paid)}</p></CardContent></Card>
        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2]"><CardContent className="p-5"><p className="text-xs uppercase tracking-[0.28em] text-[#8b7a66]">Outstanding</p><p className="mt-3 text-3xl font-black text-[#23180d]">{formatCurrency(totals.outstanding)}</p></CardContent></Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
          <CardHeader><CardTitle className="text-[#23180d]">Add billing item</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            <Input value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} placeholder="Supplier" className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
            <div className="grid grid-cols-2 gap-3">
              <Input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Amount" className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
              <Input value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} type="date" className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
            </div>
            <Input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Note" className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
            <Button className="rounded-lg bg-[#9f5f2a] text-white hover:bg-[#834a1c]" onClick={addRecord}>Create billing item</Button>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
          <CardHeader><CardTitle className="text-[#23180d]">Financial ledger</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto px-0 pb-0">
            <Table className="min-w-[980px]">
              <TableHeader>
                <TableRow className="border-[#eadbc7] hover:bg-transparent">
                  <TableHead className="px-6 text-[#8b7a66]">Supplier</TableHead>
                  <TableHead className="text-[#8b7a66]">Due</TableHead>
                  <TableHead className="text-[#8b7a66]">Amount</TableHead>
                  <TableHead className="text-[#8b7a66]">Status</TableHead>
                  <TableHead className="text-[#8b7a66]">Note</TableHead>
                  <TableHead className="px-6 text-right text-[#8b7a66]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id} className="border-[#eadbc7] hover:bg-[#faf1e4]">
                    <TableCell className="px-6"><Input value={record.supplier} onChange={(e) => updateRecord(record.id, { supplier: e.target.value })} className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" /></TableCell>
                    <TableCell><Input value={record.dueDate} onChange={(e) => updateRecord(record.id, { dueDate: e.target.value })} type="date" className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" /></TableCell>
                    <TableCell>
                      <Input value={String(record.amount)} onChange={(e) => updateRecord(record.id, { amount: Number(e.target.value) || 0 })} className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
                      <p className="mt-2 text-xs text-[#6d5c48]">{formatCurrency(record.amount, record.currency)}</p>
                    </TableCell>
                    <TableCell><select className="rounded-md border border-[#d8c9b4] bg-[#fffaf2] px-2 py-1 text-xs text-[#23180d]" value={record.status} onChange={(e) => updateRecord(record.id, { status: e.target.value as BillingRecord['status'] })}><option value="scheduled">Scheduled</option><option value="holding">Holding</option><option value="paid">Paid</option></select></TableCell>
                    <TableCell><Input value={record.note} onChange={(e) => updateRecord(record.id, { note: e.target.value })} className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" /></TableCell>
                    <TableCell className="px-6 text-right"><Button variant="destructive" className="rounded-lg" onClick={() => deleteRecord(record.id)}>Delete</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


