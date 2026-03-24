import { getCatalogue } from "@/lib/mock-data";

export async function GET() {
  const adventures = await getCatalogue();
  return Response.json({ data: adventures });
}
