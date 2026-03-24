import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import { getWishlist } from "@/lib/mock-data";

export default async function WishlistPage() {
  const wishlist = await getWishlist();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">Wishlist</p>
        <h2 className="mt-2 text-4xl font-black italic tracking-tight">Future itineraries</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {wishlist.map((item) => (
          <Card key={item.id} className="overflow-hidden rounded-xl border-white/70 bg-white/75">
            <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
            <CardContent className="p-6">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-primary/60">{item.category}</p>
              <h3 className="mt-2 text-2xl font-black tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.location}</p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span>Ideal window: {item.idealWindow}</span>
                <span className="font-semibold">{formatCurrency(item.priceFrom)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
