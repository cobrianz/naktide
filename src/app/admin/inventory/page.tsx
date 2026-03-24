import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, titleCase } from "@/lib/formatters";
import { getInventory } from "@/lib/mock-data";

export default async function AdminInventoryPage() {
  const inventory = await getInventory();

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {inventory.map((item) => (
        <Card key={item.id} className="rounded-xl border-white/10 bg-white/6 text-white">
          <CardHeader>
            <CardTitle className="text-white">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between"><span className="text-sm text-white/60">Departure</span><span>{formatDate(item.departureDate)}</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-white/60">Booked / capacity</span><span>{item.booked} / {item.capacity}</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-white/60">Waitlist</span><span>{item.waitlist}</span></div>
            <Badge className="bg-[#f16529] text-white">{titleCase(item.status)}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
