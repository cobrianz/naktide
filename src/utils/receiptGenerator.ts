import jsPDF from 'jspdf';
import QRCode from 'qrcode';

interface ReceiptItem {
  desc: string;
  amount: number;
}

interface ReceiptData {
  tourName?: string;
  tagline?: string;
  receiptTitle?: string;
  receiptCode: string;
  dateReceipt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    payment: string;
    datetime: string;
  };
  items: ReceiptItem[];
  totalPaid: number;
  bookingRef: string;
  travelDates: string;
  extras: string;
  qrLink: string;
  thankYouMsg?: string;
  subThank?: string;
  footerNote?: string;
}

// Brand colors (RGB)
const BRAND_BROWN: [number, number, number] = [139, 69, 19]; // #8b4513
const BLACK: [number, number, number] = [0, 0, 0];

export const generateReceipt = async (data: ReceiptData) => {
  // PDF setup: A4, unit = mm, portrait
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageWidth = doc.internal.pageSize.getWidth(); // 210 mm
  const margin = 18; // 1.8cm margin
  const xLeft = margin;
  const xRightAlign = pageWidth - margin;

  let currentY = margin + 2;

  // Helper functions
  const drawHorizontalRule = (y: number, thickness = 0.6, color = BRAND_BROWN) => {
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(thickness);
    doc.line(margin, y, pageWidth - margin, y);
  };

  const drawInfoLine = (label: string, value: string, xLabel: number, xValue: number, y: number) => {
    doc.setFontSize(10);
    doc.setFont("courier", "bold");
    doc.setTextColor(BRAND_BROWN[0], BRAND_BROWN[1], BRAND_BROWN[2]);
    doc.text(label, xLabel, y);
    doc.setFont("courier", "normal");
    doc.setTextColor(BLACK[0], BLACK[1], BLACK[2]);
    doc.text(value, xValue, y);
  };

  const drawTableRow = (description: string, amountStr: string, y: number, isTotal = false) => {
    doc.setFontSize(9.5);
    if (isTotal) {
      doc.setFont("courier", "bold");
      doc.setTextColor(BRAND_BROWN[0], BRAND_BROWN[1], BRAND_BROWN[2]);
    } else {
      doc.setFont("courier", "normal");
      doc.setTextColor(0, 0, 0);
    }

    const xAmountRight = xRightAlign - 2;
    const maxDescWidth = (xAmountRight - xLeft) - 8;
    const descLines = doc.splitTextToSize(description, maxDescWidth);
    
    let yCursor = y;
    for (let i = 0; i < descLines.length; i++) {
        doc.text(descLines[i], xLeft, yCursor);
        if (i === 0) {
            doc.text(amountStr, xAmountRight, yCursor, { align: "right" });
        }
        yCursor += 5.2;
    }
    return yCursor;
  };

  // 1) HEADER SECTION
  doc.setFont("courier", "bold");
  doc.setFontSize(18);
  doc.setTextColor(BRAND_BROWN[0], BRAND_BROWN[1], BRAND_BROWN[2]);
  doc.text(data.tourName || "NAKTIDE TOURS", pageWidth / 2, currentY, { align: "center" });
  currentY += 5.5;

  doc.setFont("courier", "italic");
  doc.setFontSize(8);
  doc.setTextColor(BRAND_BROWN[0], BRAND_BROWN[1], BRAND_BROWN[2]);
  doc.text(data.tagline || "Your Journey Begins Here", pageWidth / 2, currentY, { align: "center" });
  currentY += 5.5;

  drawHorizontalRule(currentY, 0.8);
  currentY += 5.5;

  doc.setFont("courier", "bold");
  doc.setFontSize(16);
  doc.setTextColor(BRAND_BROWN[0], BRAND_BROWN[1], BRAND_BROWN[2]);
  doc.text(data.receiptTitle || "BOOKING RECEIPT", pageWidth / 2, currentY, { align: "center" });
  currentY += 5;

  doc.setFont("courier", "normal");
  doc.setFontSize(7);
  doc.setTextColor(BRAND_BROWN[0], BRAND_BROWN[1], BRAND_BROWN[2]);
  doc.text(`${data.receiptCode}   •   ${data.dateReceipt}`, pageWidth / 2, currentY, { align: "center" });
  currentY += 8;

  // 2) CUSTOMER INFO BLOCK
  const col2X = xLeft + 56;
  drawInfoLine("Customer", data.customer.name, xLeft, col2X, currentY);
  currentY += 6;
  drawInfoLine("Email", data.customer.email, xLeft, col2X, currentY);
  currentY += 6;
  drawInfoLine("Phone", data.customer.phone, xLeft, col2X, currentY);
  currentY += 6;
  drawInfoLine("Payment", data.customer.payment, xLeft, col2X, currentY);
  currentY += 6;
  drawInfoLine("Date/Time", data.customer.datetime, xLeft, col2X, currentY);
  currentY += 12;

  // 3) ITEMIZED TABLE
  doc.setFont("courier", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(BRAND_BROWN[0], BRAND_BROWN[1], BRAND_BROWN[2]);
  doc.text("Description", xLeft, currentY);
  doc.text("Amount (KSh)", xRightAlign - 2, currentY, { align: "right" });
  currentY += 2.5;
  drawHorizontalRule(currentY - 1.2, 0.4);
  currentY += 4;

  for (const item of data.items) {
    const amountFormatted = item.amount.toLocaleString('en-KE');
    currentY = drawTableRow(item.desc, amountFormatted, currentY);
    currentY += 2;
  }

  currentY += 2;
  drawHorizontalRule(currentY - 1.5, 0.4);
  currentY += 4;

  const totalFormatted = data.totalPaid.toLocaleString('en-KE');
  currentY = drawTableRow("TOTAL PAID", totalFormatted, currentY, true);
  currentY += 0.8;
  drawHorizontalRule(currentY - 3, 0.6);
  currentY += 8;

  // 4) BOOKING DETAILS
  doc.setFont("courier", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(0, 0, 0);
  doc.text(`Booking Reference: ${data.bookingRef}`, pageWidth / 2, currentY, { align: "center" });
  currentY += 5.5;
  doc.text(`Travel Dates: ${data.travelDates}`, pageWidth / 2, currentY, { align: "center" });
  currentY += 5.5;
  doc.text(data.extras, pageWidth / 2, currentY, { align: "center" });
  currentY += 14;

  // 5) QR CODE
  const qrSize = 28;
  const qrX = (pageWidth / 2) - (qrSize / 2);
  const qrDataUrl = await QRCode.toDataURL(data.qrLink, {
    margin: 1,
    color: {
      dark: '#4a2a10',
      light: '#ffffff'
    }
  });
  doc.addImage(qrDataUrl, 'PNG', qrX, currentY, qrSize, qrSize);
  currentY += qrSize + 4;

  doc.setFont("courier", "bold");
  doc.setFontSize(7);
  doc.setTextColor(BRAND_BROWN[0], BRAND_BROWN[1], BRAND_BROWN[2]);
  doc.text("Scan QR to verify booking & download e-ticket", pageWidth / 2, currentY, { align: "center" });
  currentY += 9;

  // 6) THANK YOU & FOOTER
  doc.setFont("courier", "italic");
  doc.setFontSize(12);
  doc.setTextColor(BRAND_BROWN[0], BRAND_BROWN[1], BRAND_BROWN[2]);
  doc.text(data.thankYouMsg || "Thank you for choosing Naktide Tours!", pageWidth / 2, currentY, { align: "center" });
  currentY += 6;
  doc.setFont("courier", "normal");
  doc.setFontSize(7);
  doc.setTextColor(80, 60, 40);
  doc.text(data.subThank || "We can't wait to welcome you on safari.", pageWidth / 2, currentY, { align: "center" });
  currentY += 9;

  drawHorizontalRule(currentY, 0.5);
  currentY += 5;

  doc.setFontSize(6.5);
  doc.setTextColor(100, 70, 45);
  doc.text(data.footerNote || "This is your official receipt. Keep for records. No cash refunds. Terms & conditions apply.", pageWidth / 2, currentY, { align: "center" });

  doc.save(`Naktide_Tours_Receipt_${data.receiptCode}.pdf`);
};
