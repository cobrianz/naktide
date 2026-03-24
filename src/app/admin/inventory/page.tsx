import { AdminInventoryManager } from "@/components/admin/AdminInventoryManager";
import { getInventory } from "@/lib/mock-data";

export default async function AdminInventoryPage() {
  const inventory = await getInventory();
  return <AdminInventoryManager initialInventory={inventory} />;
}
