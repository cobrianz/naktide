import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { UserDashboardShell } from "@/components/dashboard/UserDashboardShell";
import { getCurrentSession } from "@/lib/auth";
import { getUserProfile } from "@/lib/mock-data";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getCurrentSession();
  if (!session) redirect("/auth/login");
  if (session.role === "admin") redirect("/admin");

  const profile = await getUserProfile();
  if (!profile) redirect("/auth/login");

  return <UserDashboardShell profile={profile}>{children}</UserDashboardShell>;
}
