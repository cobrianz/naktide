import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import { getCurrentSession } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getCurrentSession();
  if (!session) redirect("/auth/login");
  if (session.role !== "admin") redirect("/dashboard");

  return <AdminShell>{children}</AdminShell>;
}
