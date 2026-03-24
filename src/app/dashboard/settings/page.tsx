import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { getUserProfile, getUserSettings } from "@/lib/mock-data";

export default async function SettingsPage() {
  const [profile, settings] = await Promise.all([getUserProfile(), getUserSettings()]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Settings</p>
        <h2 className="mt-2 text-4xl font-black italic tracking-tight">Profile and preferences</h2>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="rounded-xl border-white/70 bg-white/75">
          <CardHeader>
            <CardTitle>Traveler profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Full name</label>
              <Input value={profile.name} readOnly />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <Input value={profile.email} readOnly />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Phone</label>
              <Input value={profile.phone} readOnly />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-white/70 bg-white/75">
          <CardHeader>
            <CardTitle>Notification preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between rounded-2xl bg-[#faf8f3] p-4">
              <div>
                <p className="font-semibold">Expedition alerts</p>
                <p className="text-sm text-muted-foreground">Departure changes and permit updates</p>
              </div>
              <Switch defaultChecked={settings.notifications.expeditionAlerts} />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-[#faf8f3] p-4">
              <div>
                <p className="font-semibold">Payment updates</p>
                <p className="text-sm text-muted-foreground">Invoices, receipts, and settlement notices</p>
              </div>
              <Switch defaultChecked={settings.notifications.paymentUpdates} />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-[#faf8f3] p-4">
              <div>
                <p className="font-semibold">Weekly digest</p>
                <p className="text-sm text-muted-foreground">Curated expedition and inventory summary</p>
              </div>
              <Switch defaultChecked={settings.notifications.weeklyDigest} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
