"use client";

import { useState } from "react";
import { toast } from "sonner";

import type { AdminSettings } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export function AdminSettingsManager({ initialSettings }: { initialSettings: AdminSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  async function save(partial: Partial<AdminSettings>) {
    const next = { ...settings, ...partial };
    setSettings(next);
    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partial),
      });
      const payload = await response.json();
      if (!payload.data) throw new Error(payload.error || "Unable to update settings.");
      setSettings(payload.data);
      toast.success("Admin settings updated.");
    } catch (error) {
      setSettings(settings);
      toast.error(error instanceof Error ? error.message : "Unable to update settings.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
        <CardHeader><CardTitle className="text-[#23180d]">Control flags</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between rounded-lg border border-[#eadbc7] bg-[#fdf7ef] p-4">
            <div><p className="font-semibold text-[#23180d]">Allow public bookings</p><p className="text-sm text-[#6d5c48]">Public checkout can submit new requests</p></div>
            <Switch checked={settings.allowPublicBookings} onCheckedChange={(checked) => save({ allowPublicBookings: checked })} disabled={isSaving} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-[#eadbc7] bg-[#fdf7ef] p-4">
            <div><p className="font-semibold text-[#23180d]">Manual review</p><p className="text-sm text-[#6d5c48]">Require staff approval before confirmation</p></div>
            <Switch checked={settings.requireManualReview} onCheckedChange={(checked) => save({ requireManualReview: checked })} disabled={isSaving} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-[#eadbc7] bg-[#fdf7ef] p-4">
            <div><p className="font-semibold text-[#23180d]">Payouts enabled</p><p className="text-sm text-[#6d5c48]">Release supplier payouts after settlement</p></div>
            <Switch checked={settings.payoutsEnabled} onCheckedChange={(checked) => save({ payoutsEnabled: checked })} disabled={isSaving} />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
        <CardHeader><CardTitle className="text-[#23180d]">Support routing</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-[#23180d]">Support email</label>
            <Input value={settings.supportEmail} onChange={(event) => setSettings({ ...settings, supportEmail: event.target.value })} className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" />
          </div>
          <Button className="rounded-lg bg-[#9f5f2a] text-white" onClick={() => save({ supportEmail: settings.supportEmail })} disabled={isSaving}>Save support email</Button>
          <p className="text-sm text-[#6d5c48]">These controls now write to the persisted admin settings API and directly influence booking behavior.</p>
        </CardContent>
      </Card>
    </div>
  );
}
