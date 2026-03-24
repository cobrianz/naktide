import {
  createBillingRecord,
  deleteBillingRecord,
  getBillingRecords,
  updateBillingRecord,
} from "@/lib/mock-data";

export async function GET() {
  const billing = await getBillingRecords();
  return Response.json({ data: billing });
}

export async function POST(request: Request) {
  const body = await request.json();
  const record = await createBillingRecord(body);
  return Response.json({ data: record });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const record = await updateBillingRecord(body.id, body);
  return Response.json({ data: record });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const result = await deleteBillingRecord(id);
  return Response.json({ data: result });
}
