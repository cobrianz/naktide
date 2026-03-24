import { AdminCustomersManager } from "@/components/admin/AdminCustomersManager";
import { getAdminCustomers } from "@/lib/mock-data";

export default async function AdminCustomersPage() {
  const customers = await getAdminCustomers();
  return <AdminCustomersManager initialCustomers={customers} />;
}
