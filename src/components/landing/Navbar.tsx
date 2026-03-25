import NavbarClient from "@/components/landing/NavbarClient";
import { getCurrentUserRecord } from "@/lib/auth";

export default async function Navbar() {
  const user = await getCurrentUserRecord();
  const signedIn = Boolean(user);
  const accountHref = user?.role === "admin" ? "/admin" : signedIn ? "/dashboard" : "/auth/login";
  const accountLabel = user?.role === "admin" ? "Admin dashboard" : signedIn ? `${user.name.split(" ")[0]}'s dashboard` : "Sign in";

  return <NavbarClient signedIn={signedIn} accountHref={accountHref} accountLabel={accountLabel} />;
}
