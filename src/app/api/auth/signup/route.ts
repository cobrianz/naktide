import { createSession, createUserAccount } from "@/lib/auth";
import { bootstrapTravelerAccount, ensureSeeded } from "@/lib/mock-data";

export async function POST(request: Request) {
  await ensureSeeded();
  const body = await request.json();

  try {
    const user = await createUserAccount({ name: body.name, email: body.email, password: body.password, role: "traveler" });
    await bootstrapTravelerAccount({ userId: user.id, name: user.name, email: user.email, location: body.location });
    await createSession({ id: user.id, role: user.role });
    return Response.json({ data: { id: user.id, role: user.role, name: user.name } });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Signup failed" }, { status: 400 });
  }
}
