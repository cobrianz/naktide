import { getAdminOverview, getAnalytics, getOperationsFeed, getPublicContentSnapshot } from "@/lib/mock-data";

export async function GET() {
  const [overview, feed, analytics, content] = await Promise.all([
    getAdminOverview(),
    getOperationsFeed(),
    getAnalytics(),
    getPublicContentSnapshot(),
  ]);
  return Response.json({ data: { overview, feed, analytics, content } });
}
