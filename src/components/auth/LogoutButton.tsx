"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type LogoutButtonProps = {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
  label?: string;
  redirectTo?: string;
  icon?: string;
};

export function LogoutButton({
  className,
  variant = "outline",
  size = "default",
  label = "Log out",
  redirectTo = "/auth/login",
  icon = "logout",
}: LogoutButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);

    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Unable to end your session.");
      }

      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to end your session.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Button type="button" variant={variant} size={size} className={className} disabled={pending} onClick={handleLogout}>
      <span className="material-symbols-outlined text-base">{icon}</span>
      {pending ? "Signing out..." : label}
    </Button>
  );
}
