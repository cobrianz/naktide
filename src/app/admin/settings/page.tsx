import { AdminSettingsManager } from "@/components/admin/AdminSettingsManager";
import { getAdminSettings } from "@/lib/mock-data";

export default async function AdminSettingsPage() {
  const settings = await getAdminSettings();
  return <AdminSettingsManager initialSettings={settings} />;
}
