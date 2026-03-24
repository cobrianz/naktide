import { getUserSettings, updateUserSettings } from "@/lib/mock-data";

export async function GET() {
  const settings = await getUserSettings();
  return Response.json({ data: settings });
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as Parameters<typeof updateUserSettings>[0];
  const settings = await updateUserSettings(body);
  return Response.json({ data: settings });
}
