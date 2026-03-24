import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import { getAnalytics } from "@/lib/mock-data";

export default async function AdminAnalyticsPage() {
  const analytics = await getAnalytics();
  const maxValue = Math.max(...analytics.map((item) => item.value), 1);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {analytics.map((item) => (
          <Card key={item.id} className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
            <CardHeader><CardTitle className="text-[#23180d]">{item.label}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-5xl font-black text-[#23180d]">{item.label === "Average order value" ? formatCurrency(item.value) : item.value}</p>
              <p className="mt-3 text-sm text-[#9f5f2a]">{item.change} against last reporting window</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
          <CardHeader><CardTitle className="text-[#23180d]">Performance chart</CardTitle></CardHeader>
          <CardContent>
            <div className="flex h-80 items-end gap-5 rounded-lg border border-[#eadbc7] bg-[#f7efe0] p-6">
              {analytics.map((item) => (
                <div key={item.id} className="flex flex-1 flex-col items-center gap-3">
                  <div className="flex w-full flex-1 items-end rounded-lg bg-[#efe2cf] p-2">
                    <div
                      className="w-full rounded-md bg-gradient-to-t from-[#8e5120] via-[#c88743] to-[#ebcc8e]"
                      style={{ height: `${Math.max((item.value / maxValue) * 100, 16)}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-[#23180d]">{item.label === "Average order value" ? formatCurrency(item.value) : item.value}</p>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#8b7a66]">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-[#d8c9b4] bg-[#fffaf2] shadow-[0_18px_50px_rgba(108,76,41,0.08)]">
          <CardHeader><CardTitle className="text-[#23180d]">Field readout</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {analytics.map((item) => (
              <div key={item.id} className="rounded-lg border border-[#eadbc7] bg-[#fdf7ef] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[#23180d]">{item.label}</p>
                  <p className="text-sm font-bold text-[#9f5f2a]">{item.change}</p>
                </div>
                <div className="mt-3 h-2.5 rounded-full bg-[#efe2cf]">
                  <div className="h-2.5 rounded-full bg-[#b97233]" style={{ width: `${Math.max((item.value / maxValue) * 100, 14)}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
