import { AdminBookingsManager } from "@/components/admin/AdminBookingsManager";
import { getUserBookings } from "@/lib/mock-data";

export default async function AdminBookingsPage() {
  const bookings = await getUserBookings();
  return <AdminBookingsManager initialBookings={bookings} />;
}
