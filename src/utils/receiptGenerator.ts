import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ReceiptData {
  bookingId: string;
  customerName: string;
  adventureName: string;
  date: string;
  attendees: string;
  price: string;
  status: string;
}

export const generateReceipt = (data: ReceiptData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // --- Watermark ---
  doc.setTextColor(240, 240, 240); // Very light gray
  doc.setFontSize(60);
  doc.setFont('helvetica', 'bold');
  doc.saveGraphicsState();
  doc.setGState(new (doc as any).GState({ opacity: 0.1 }));
  doc.text('NAKTIDE', pageWidth / 2, pageHeight / 2, {
    align: 'center',
    angle: 45
  });
  doc.restoreGraphicsState();

  // --- Header ---
  // Logo placeholder text
  doc.setTextColor(173, 44, 0); // Primary color #ad2c00
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('NakTide', 20, 30);
  
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('The Savannah Collection', 20, 38);
  doc.text('Expedition Global | Nairobi, Kenya', 20, 43);

  // Receipt Label
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL RECEIPT', pageWidth - 20, 30, { align: 'right' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Booking ID: ${data.bookingId}`, pageWidth - 20, 38, { align: 'right' });
  doc.text(`Issued: ${new Date().toLocaleDateString()}`, pageWidth - 20, 43, { align: 'right' });

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 55, pageWidth - 20, 55);

  // --- Customer Info ---
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To:', 20, 70);
  doc.setFont('helvetica', 'normal');
  doc.text(data.customerName, 20, 78);
  doc.text('Verification: NakTide Voyager Member', 20, 83);

  // --- Details Table ---
  autoTable(doc, {
    startY: 100,
    head: [['Adventure Designation', 'Date', 'Party', 'Status', 'Total Amount']],
    body: [
      [
        data.adventureName,
        data.date,
        data.attendees,
        data.status,
        data.price
      ]
    ],
    headStyles: {
      fillColor: [173, 44, 0], // #ad2c00
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      textColor: [50, 50, 50],
      halign: 'center',
      minCellHeight: 15
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
    },
    margin: { top: 100, left: 20, right: 20 }
  });

  // --- Totals ---
  const finalY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Amount Paid:', pageWidth - 60, finalY, { align: 'right' });
  doc.setTextColor(173, 44, 0);
  doc.text(data.price, pageWidth - 20, finalY, { align: 'right' });

  // --- Footer ---
  doc.setTextColor(130, 130, 130);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('Thank you for choosing NakTide for your African adventure.', pageWidth / 2, pageHeight - 30, { align: 'center' });
  doc.text('This is a digitally generated receipt. No physical signature required.', pageWidth / 2, pageHeight - 25, { align: 'center' });
  
  // Save the PDF
  doc.save(`NakTide_Receipt_${data.bookingId}.pdf`);
};
