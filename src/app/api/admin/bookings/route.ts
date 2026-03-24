import { createUserMessage, deleteBooking, getUserBookings, updateBooking } from "@/lib/mock-data";

export async function GET() {
  const bookings = await getUserBookings();
  return Response.json({ data: bookings });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const booking = await updateBooking(body.id, body);

  if (body.messageBody && booking) {
    await createUserMessage({
      subject: body.messageSubject ?? `Update for ${booking.adventureTitle}`,
      body: body.messageBody,
      from: "Admin Operations",
      to: booking.customerName,
      status: "unread",
      bookingId: booking.id,
    });
  }

  return Response.json({ data: booking });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const result = await deleteBooking(id);
  return Response.json({ data: result });
}
