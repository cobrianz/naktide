import { getAdminOverview, getAnalytics, getOperationsFeed } from "@/lib/mock-data";

export async function GET() {
  const [overview, feed, analytics] = await Promise.all([getAdminOverview(), getOperationsFeed(), getAnalytics()]);
  return Response.json({ data: { overview, feed, analytics } });
}
