import { createUserMessage, getUserMessages, updateUserMessage } from "@/lib/mock-data";

export async function GET() {
  const messages = await getUserMessages();
  return Response.json({ data: messages });
}

export async function POST(request: Request) {
  const body = await request.json();
  const message = await createUserMessage(body);
  return Response.json({ data: message });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const message = await updateUserMessage(body.id, body);
  return Response.json({ data: message });
}
