import { getPublicContentSnapshot } from "@/lib/mock-data";

export async function GET() {
  const snapshot = await getPublicContentSnapshot();
  return Response.json({ data: snapshot });
}
