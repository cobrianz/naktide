import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { getAdminSettings } from "@/lib/mock-data";

export default async function AdminSettingsPage() {
  const settings = await getAdminSettings();

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
        <CardHeader><CardTitle className="text-[#23180d]">Control flags</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between rounded-lg border border-[#eadbc7] bg-[#fdf7ef] p-4"><div><p className="font-semibold text-[#23180d]">Allow public bookings</p><p className="text-sm text-[#6d5c48]">Public checkout can submit new requests</p></div><Switch defaultChecked={settings.allowPublicBookings} /></div>
          <div className="flex items-center justify-between rounded-lg border border-[#eadbc7] bg-[#fdf7ef] p-4"><div><p className="font-semibold text-[#23180d]">Manual review</p><p className="text-sm text-[#6d5c48]">Require staff approval before confirmation</p></div><Switch defaultChecked={settings.requireManualReview} /></div>
          <div className="flex items-center justify-between rounded-lg border border-[#eadbc7] bg-[#fdf7ef] p-4"><div><p className="font-semibold text-[#23180d]">Payouts enabled</p><p className="text-sm text-[#6d5c48]">Release supplier payouts after settlement</p></div><Switch defaultChecked={settings.payoutsEnabled} /></div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
        <CardHeader><CardTitle className="text-[#23180d]">Support routing</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2"><label className="text-sm font-medium text-[#23180d]">Support email</label><Input value={settings.supportEmail} readOnly className="border-[#d8c9b4] bg-[#fffaf2] text-[#23180d]" /></div>
          <p className="text-sm text-[#6d5c48]">Connected to the mock settings API. This is where SLA, payout, and approval controls will sit when persistence is added.</p>
        </CardContent>
      </Card>
    </div>
  );
}
