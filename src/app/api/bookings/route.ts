import { getUserBookings } from "@/lib/mock-data";

export async function GET() {
  const bookings = await getUserBookings();
  return Response.json({ data: bookings });
}
