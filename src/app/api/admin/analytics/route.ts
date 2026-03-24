import { getAnalytics } from "@/lib/mock-data";

export async function GET() {
  const analytics = await getAnalytics();
  return Response.json({ data: analytics });
}
