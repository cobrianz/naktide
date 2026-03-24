import { AdminBillingManager } from "@/components/admin/AdminBillingManager";
import { getBillingRecords } from "@/lib/mock-data";

export default async function AdminBillingPage() {
  const records = await getBillingRecords();
  return <AdminBillingManager initialRecords={records} />;
}
