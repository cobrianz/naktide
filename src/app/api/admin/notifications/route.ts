import {
  createNotification,
  deleteNotification,
  getSiteNotifications,
  updateNotification,
} from "@/lib/mock-data";

export async function GET() {
  const notifications = await getSiteNotifications();
  return Response.json({ data: notifications });
}

export async function POST(request: Request) {
  const body = await request.json();
  const notification = await createNotification(body);
  return Response.json({ data: notification });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const notification = await updateNotification(body.id, body);
  return Response.json({ data: notification });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const result = await deleteNotification(id);
  return Response.json({ data: result });
}
