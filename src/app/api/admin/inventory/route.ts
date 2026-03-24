import { getInventory } from "@/lib/mock-data";

export async function GET() {
  const inventory = await getInventory();
  return Response.json({ data: inventory });
}
