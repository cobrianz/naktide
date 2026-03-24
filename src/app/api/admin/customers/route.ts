import { createAdminCustomer, deleteAdminCustomer, getAdminCustomers, updateAdminCustomer } from "@/lib/mock-data";

export async function GET() {
  const customers = await getAdminCustomers();
  return Response.json({ data: customers });
}

export async function POST(request: Request) {
  const body = await request.json();
  const customer = await createAdminCustomer(body);
  return Response.json({ data: customer });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const customer = await updateAdminCustomer(body.id, body);
  return Response.json({ data: customer });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const result = await deleteAdminCustomer(id);
  return Response.json({ data: result });
}
