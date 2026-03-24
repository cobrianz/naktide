import type { ReactNode } from "react";

import { UserDashboardShell } from "@/components/dashboard/UserDashboardShell";
import { getUserProfile } from "@/lib/mock-data";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const profile = await getUserProfile();

  return <UserDashboardShell profile={profile}>{children}</UserDashboardShell>;
}
