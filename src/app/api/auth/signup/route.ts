import { createSession, createUserAccount } from "@/lib/auth";
import { bootstrapTravelerAccount, ensureSeeded } from "@/lib/mock-data";

export async function POST(request: Request) {
  await ensureSeeded();
  const body = (await request.json()) as { name?: string; email?: string; location?: string; password?: string };
  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const location = body.location?.trim() || "Nairobi, Kenya";
  const password = body.password ?? "";

  if (!name || !email || !password) {
    return Response.json({ error: "Name, email, and password are required." }, { status: 400 });
  }

  if (password.length < 8) {
    return Response.json({ error: "Password must be at least 8 characters long." }, { status: 400 });
  }

  try {
    const user = await createUserAccount({ name, email, password, role: "traveler" });
    await bootstrapTravelerAccount({ userId: user.id, name: user.name, email: user.email, location });
    await createSession({ id: user.id, role: user.role });
    return Response.json({ data: { id: user.id, role: user.role, name: user.name } });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Signup failed" }, { status: 400 });
  }
}
