import { authenticateUser, createSession } from "@/lib/auth";
import { ensureSeeded } from "@/lib/mock-data";

export async function POST(request: Request) {
  await ensureSeeded();
  const body = (await request.json()) as { email?: string; password?: string };
  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";

  if (!email || !password) {
    return Response.json({ error: "Email and password are required." }, { status: 400 });
  }

  try {
    const user = await authenticateUser(email, password);
    await createSession({ id: user.id, role: user.role });
    return Response.json({ data: { id: user.id, role: user.role, name: user.name } });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Login failed" }, { status: 400 });
  }
}
