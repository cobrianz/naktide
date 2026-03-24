import { getUserMessages } from "@/lib/mock-data";

export async function GET() {
  const messages = await getUserMessages();
  return Response.json({ data: messages });
}
