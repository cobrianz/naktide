import { getWishlist } from "@/lib/mock-data";

export async function GET() {
  const wishlist = await getWishlist();
  return Response.json({ data: wishlist });
}
