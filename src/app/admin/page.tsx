import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDateTime } from "@/lib/formatters";
import { getAdminOverview, getAnalytics, getOperationsFeed, getPublicContentSnapshot } from "@/lib/mock-data";

export default async function AdminPage() {
  const [overview, feed, analytics, content] = await Promise.all([
    getAdminOverview(),
    getOperationsFeed(),
    getAnalytics(),
    getPublicContentSnapshot(),
  ]);

  const maxValue = Math.max(...analytics.map((item) => item.value), 1);
  const bookingMix = [
    { label: "Confirmed", value: overview.bookings.confirmed, tone: "bg-emerald-500" },
    { label: "Pending", value: overview.bookings.pending, tone: "bg-amber-500" },
    { label: "Waitlist", value: overview.inventory.waitlist, tone: "bg-stone-500" },
  ];
  const contentStats = [
    { label: "Tours", value: content.tours.length },
    { label: "Gallery assets", value: content.media.length },
    { label: "Public notices", value: content.notifications.filter((item) => item.audience === "public").length },
    { label: "Blogs", value: content.blogs.length },
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]"><CardContent className="p-5"><p className="text-xs uppercase tracking-[0.3em] text-[#8b7a66]">Revenue</p><p className="mt-3 text-3xl font-black text-[#23180d]">{formatCurrency(overview.bookings.revenue)}</p></CardContent></Card>
        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]"><CardContent className="p-5"><p className="text-xs uppercase tracking-[0.3em] text-[#8b7a66]">Open seats</p><p className="mt-3 text-3xl font-black text-[#23180d]">{overview.inventory.seatsOpen}</p></CardContent></Card>
        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]"><CardContent className="p-5"><p className="text-xs uppercase tracking-[0.3em] text-[#8b7a66]">VIP travelers</p><p className="mt-3 text-3xl font-black text-[#23180d]">{overview.customers.vip}</p></CardContent></Card>
        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]"><CardContent className="p-5"><p className="text-xs uppercase tracking-[0.3em] text-[#8b7a66]">Outstanding billing</p><p className="mt-3 text-3xl font-black text-[#23180d]">{formatCurrency(overview.billing.outstanding)}</p></CardContent></Card>
        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]"><CardContent className="p-5"><p className="text-xs uppercase tracking-[0.3em] text-[#8b7a66]">Pending review</p><p className="mt-3 text-3xl font-black text-[#23180d]">{overview.bookings.pending}</p></CardContent></Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
          <CardHeader><CardTitle className="text-[#23180d]">Commercial analytics</CardTitle></CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-lg border border-[#eadbc7] bg-[#f7efe0] p-5">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#8b7a66]">Pipeline trend</p>
                  <p className="mt-2 text-2xl font-black text-[#23180d]">Demand by operating signal</p>
                </div>
                <p className="text-sm text-[#6d5c48]">Kenya-led safari demand mix</p>
              </div>
              <div className="flex h-72 items-end gap-4">
                {analytics.map((item) => (
                  <div key={item.id} className="flex flex-1 flex-col items-center gap-3">
                    <div className="flex w-full flex-1 items-end rounded-lg bg-[#efe2cf] p-2">
                      <div className="w-full rounded-md bg-gradient-to-t from-[#9f5f2a] via-[#c88743] to-[#edc987]" style={{ height: `${Math.max((item.value / maxValue) * 100, 18)}%` }} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-[#23180d]">{item.label === "Average order value" ? formatCurrency(item.value) : item.value}</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#8b7a66]">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {analytics.map((item) => (
                <div key={item.id} className="rounded-lg border border-[#eadbc7] bg-[#fdf7ef] p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#8b7a66]">{item.label}</p>
                  <p className="mt-3 text-4xl font-black text-[#23180d]">{item.label === "Average order value" ? formatCurrency(item.value) : item.value}</p>
                  <p className="mt-2 text-sm text-[#9f5f2a]">{item.change} vs prior window</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
          <CardHeader><CardTitle className="text-[#23180d]">Operations feed</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-[#eadbc7] bg-[#fdf7ef] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[#8b7a66]">Booking mix</p>
              <div className="mt-5 space-y-4">
                {bookingMix.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[#23180d]"><span>{item.label}</span><span>{item.value}</span></div>
                    <div className="h-2.5 rounded-full bg-[#efe2cf]"><div className={`${item.tone} h-2.5 rounded-full`} style={{ width: `${Math.max((item.value / Math.max(overview.bookings.total, overview.inventory.waitlist, 1)) * 100, 14)}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
            {feed.map((item) => <div key={item.id} className="rounded-lg border border-[#eadbc7] bg-[#fdf7ef] p-4"><div className="flex items-center justify-between gap-3"><p className="font-semibold text-[#23180d]">{item.title}</p><Badge className="bg-[#9f5f2a] text-white">{item.kind}</Badge></div><p className="mt-2 text-sm text-[#6d5c48]">{formatDateTime(item.at)}</p></div>)}
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
          <CardHeader><CardTitle className="text-[#23180d]">Public content sync</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            {contentStats.map((item) => (
              <div key={item.label} className="rounded-lg border border-[#eadbc7] bg-[#fdf7ef] p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-[#8b7a66]">{item.label}</p>
                <p className="mt-3 text-4xl font-black text-[#23180d]">{item.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
