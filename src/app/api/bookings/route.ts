import { createBooking, getUserBookings } from "@/lib/mock-data";

export async function GET() {
  const bookings = await getUserBookings();
  return Response.json({ data: bookings });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      adventureId?: string;
      travelDate?: string;
      partySize?: number;
      travelers?: string[];
      phone?: string;
      notes?: string;
    };

    if (!body.adventureId || !body.phone?.trim()) {
      return Response.json({ error: "Adventure and phone number are required." }, { status: 400 });
    }

    const booking = await createBooking({
      adventureId: body.adventureId,
      travelDate: body.travelDate,
      partySize: Math.max(Number(body.partySize) || 1, 1),
      travelers: Array.isArray(body.travelers) ? body.travelers : [],
      phone: body.phone,
      notes: body.notes,
    });

    return Response.json({ data: booking }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create booking.";
    const status = message === "Not authenticated" ? 401 : 400;
    return Response.json({ error: message }, { status });
  }
}
