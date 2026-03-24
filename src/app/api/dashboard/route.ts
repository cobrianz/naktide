import { getDashboardSummary, getUserProfile } from "@/lib/mock-data";

export async function GET() {
  const [profile, summary] = await Promise.all([getUserProfile(), getDashboardSummary()]);
  return Response.json({ data: { profile, summary } });
}
