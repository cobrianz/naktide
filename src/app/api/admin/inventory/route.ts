import { createInventoryItem, deleteInventoryItem, getInventory, updateInventoryItem } from "@/lib/mock-data";

export async function GET() {
  const inventory = await getInventory();
  return Response.json({ data: inventory });
}

export async function POST(request: Request) {
  const body = await request.json();
  const item = await createInventoryItem(body);
  return Response.json({ data: item }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const item = await updateInventoryItem(body.id, body);
  return Response.json({ data: item });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const result = await deleteInventoryItem(id);
  return Response.json({ data: result });
}
