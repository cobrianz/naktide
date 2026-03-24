import { getAdminSettings, updateAdminSettings } from "@/lib/mock-data";

export async function GET() {
  const settings = await getAdminSettings();
  return Response.json({ data: settings });
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as Parameters<typeof updateAdminSettings>[0];
  const settings = await updateAdminSettings(body);
  return Response.json({ data: settings });
}
