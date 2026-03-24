"use client";

import { generateReceipt } from "@/utils/receiptGenerator";
import type { Booking } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/formatters";

export function ReceiptDownloadButton({ booking }: { booking: Booking }) {
  async function handleDownload() {
    await generateReceipt({
      receiptCode: booking.reference,
      dateReceipt: formatDateTime(new Date().toISOString()),
      customer: {
        name: booking.customerName,
        email: `${booking.customerId}@naktide.local`,
        phone: "+254 700 555 210",
        payment: booking.currency,
        datetime: formatDateTime(new Date().toISOString()),
      },
      items: [
        {
          desc: `${booking.adventureTitle} safari booking`,
          amount: booking.amount,
        },
      ],
      totalPaid: booking.amount,
      bookingRef: booking.reference,
      travelDates: booking.travelDate,
      extras: booking.notes,
      qrLink: `https://naktide.com/bookings/${booking.id}`,
      tourName: booking.adventureTitle,
      tagline: "Kenya safari planning from Nairobi",
      thankYouMsg: "Thank you for choosing NakTide Expeditions!",
      subThank: "Your booking receipt is ready.",
      footerNote: "Mock receipt generated from local booking data.",
    });
  }

  return (
    <Button className="rounded-lg bg-primary text-white" onClick={handleDownload}>
      Download PDF receipt
    </Button>
  );
}
